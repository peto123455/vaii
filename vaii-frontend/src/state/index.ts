import { reactive, readonly } from "vue";
import { User } from "@/objects/user";
import { Category } from "@/objects/category";
import { Course } from "@/objects/course";
import { GetAPIUrl } from "@/config"
import { Topic } from '@/objects/topic'

const state = reactive({
  /*popups: [] as any[]*/
  ranks: Array<String>(),
  categories: Array<Category>(),
  topics: Array<Topic>(),
  courses: Array<Course>(),
  popups: Array<any>(),
  user: new User(null, null, null, null)
  //user: 
});

const methods = {
  async FetchRanksFromServer() {

    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(GetAPIUrl("/auth/ranks"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      state.categories = [];

      if (data["error"]) {
        return methods.CreatePopup({title: 'Sťahovanie hodností', msg: data["error"]});
      }

      for (const rank in data) {
        state.ranks.push(data[rank] as string);
      }

    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Sťahovanie hodností', msg: 'Nepodarilo sa kontaktovať server, nebolo možné získať hodnosti'});
    }
  },
  async FetchTopicsFromServer() {

    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(GetAPIUrl("/topics"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      state.categories = [];

      if (data["error"]) {
        return methods.CreatePopup({title: 'Sťahovanie článkov', msg: data["error"]});
      }

      for (const topic in data) {
        state.topics.push(new Topic(data[topic]["_id"] as string, data[topic]["title"] as string, data[topic]["description"] as string, data[topic]["image"] as string));
      }

      console.log(state.topics);

    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Sťahovanie článkov', msg: 'Nepodarilo sa kontaktovať server, nebolo možné získať články'});
    }
  },
  async FetchCategoriesFromServer() {

    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(GetAPIUrl("/category/list"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      state.categories = [];

      if (data["error"]) {
        return methods.CreatePopup({title: 'Sťahovanie skupín', msg: data["error"]});
      }

      for (const category in data) {
        state.categories.push(new Category(data[category]["_id"] as string, data[category]["name"] as string, data[category]["theoryHours"] as number, data[category]["driveHours"] as number, data[category]["description"] as string, data[category]["price"] as number));
      }

    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Sťahovanie skupín', msg: 'Nepodarilo sa kontaktovať server, nebolo možné získať cenník'});
    }
  },
  async FetchCoursesFromServer() {

    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
  
      const res = await fetch(GetAPIUrl("/course"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();
  
      state.courses = [];
  
      for (const course in data) {
        state.courses.push(new Course(
          data[course]["_id"] as string, 
          data[course]["name"] as string, 
          data[course]["theoryHours"] as number, 
          data[course]["driveHours"] as number, 
          data[course]["description"] as string, 
          data[course]["price"] as number,
          data[course]["theoryHoursCompleted"] as number, 
          data[course]["driveHoursCompleted"] as number, 
          data[course]["paid"] as number, 
          data[course]["completed"] as boolean
        ));
      }
  
    } catch (error: any) {
      console.log(error);
    }
  },
  async FetchUserFromServer() {
    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      const res = await fetch(GetAPIUrl("/auth/user"), requestOptions as RequestInit); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      if (data["id"] && !data["error"]) {
        methods.SetUserParams(data["id"], data["email"], data["permLevel"], data["rank"]);
      } else {
        methods.SetUserParams(null, null, null, null);
      }

      /*if (data["error"]) {
        return methods.CreatePopup({title: 'Automatické prihlásenie', msg: data["error"]});
      }*/
      
    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Kontrola prihlásenia', msg: 'Nepodarilo sa kontaktovať server'});
    }
  },
  SetUserParams(id: string | null, email: string | null, permLevel: number | null, rank: string | null) {
    state.user.id = id;
    state.user.email = email;
    state.user.permLevel = permLevel;
    state.user.rank = rank;
  },
  IsLoggedIn() : boolean {
    return state.user.id != undefined;
  },
  GetUserEmail() : string {
    if (!this.IsLoggedIn()) return "";
    return state.user.email as string;
  },
  GetUserRank() : string {
    if (!this.IsLoggedIn()) return "";
    return state.user.rank as string;
  },
  GetUserPermLevel() : number {
    if (!this.IsLoggedIn()) return -1;
    return state.user.permLevel as number;
  },
  CreatePopup(data: any) {
    data.shown = false;
    data.id = methods.GetId();

    state.popups.push(data);

    /*setTimeout(() => {
      state.popups.shift();
    }, 5000);*/
  },
  RemovePopup(id: number) {
    state.popups = state.popups.filter((item) => {
      return item.id !== id;
    });
  },
  Show(id: number) {
    const index = state.popups.findIndex((item) => {
      return item.id === id;
    });
    if (index !== -1) {
      state.popups[index].shown = true;
    }
  },
  GetId(): number {
    let max = 0;

    state.popups.forEach((item) => {
      if (item.id >= max) max = item.id + 1;
  });

    return max;
  }
}

export default {
  state: readonly(state),
  methods
}