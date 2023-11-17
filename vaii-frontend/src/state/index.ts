import { reactive, readonly } from "vue";
import { User } from "@/objects/user";

const state = reactive({
  /*popups: [] as any[]*/
  popups: Array<any>(),
  user: new User(undefined, undefined)
  //user: 
});

const methods = {
  async FetchUserFromServer() {
    try {
      const requestOptions = {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        headers: { "Content-Type": "application/json" }
      };

      const res = await fetch("http://localhost:8080/auth/user", requestOptions); //TODO: Prerobiť na .env backend url
      const data = await res.json();
  
      console.log(data);

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