import { reactive, readonly } from "vue";
import { User } from "@/objects/user";
import { Category } from "@/objects/category";
import { Course } from "@/objects/course";
import { GetAPIUrl } from "@/config"

const state = reactive({
  /*popups: [] as any[]*/
  categories: Array<Category>(),
  courses: Array<Course>(),
  popups: Array<any>(),
  user: new User(null, null, null, null)
  //user: 
});

const methods = {
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
  
      for (const category in data) {
        state.courses.push(new Course(data[category]["_id"] as string, 
          data[category]["name"] as string, 
          data[category]["theoryHours"] as number, 
          data[category]["driveHours"] as number, 
          data[category]["description"] as string, 
          data[category]["price"] as number,
          data[category]["theoryHoursCompleted"] as number, 
          data[category]["driveHoursCompleted"] as number, 
          data[category]["paid"] as number, 
          data[category]["completed"] as boolean
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