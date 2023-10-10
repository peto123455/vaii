import { reactive, readonly } from "vue";

const state = reactive({
  /*popups: [] as any[]*/
  popups: Array<any>()
});

const methods = {
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