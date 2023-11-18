import { reactive, readonly } from "vue";
import { User } from "@/objects/user";
import { Category } from "@/objects/category";
import { GetAPIUrl } from "@/config"

const state = reactive({
  /*popups: [] as any[]*/
  categories: Array<Category>(),
  popups: Array<any>(),
  user: new User(undefined, undefined)
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

      const res = await fetch(GetAPIUrl("/category/list"), requestOptions); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      state.categories = [];

      for (const category in data) {
        state.categories.push(new Category(data[category]["_id"], data[category]["name"], data[category]["theoryHours"], data[category]["driveHours"], data[category]["description"], data[category]["price"]));
      }

    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Sťahovanie skupín', msg: 'Nepodarilo sa kontaktovať server, nebolo možné získať cenník'});
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

      const res = await fetch(GetAPIUrl("/auth/user"), requestOptions); //TODO: Prerobiť na .env backend url
      const data = await res.json();

      if (data["id"] && !data["error"]) {
        methods.SetUserParams(data["id"], data["email"]);
      } else {
        methods.SetUserParams(undefined, undefined);
      }
      
    } catch (error: any) {
      console.log(error);
      methods.CreatePopup({title: 'Kontrola prihlásenia', msg: 'Nepodarilo sa kontaktovať server'});
    }
  },
  SetUserParams(id: string, email: string) {
    state.user.id = id;
    state.user.email = email;
  },
  IsLoggedIn() : boolean {
    return state.user.id != undefined;
  },
  GetUserEmail() : string {
    if (!this.IsLoggedIn()) return "";
    return state.user.email as string;
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