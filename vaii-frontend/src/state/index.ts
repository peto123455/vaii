import { reactive, readonly } from "vue";

const state = reactive({
  /*popups: [] as any[]*/
  popups: Array<any>()
});

const methods = {
  CreatePopup(data: any) {
    state.popups.push(data);

    /*setTimeout(() => {
      state.popups.shift();
    }, 5000);*/
  },
  RemovePopup(id: number) {
    const index = state.popups.findIndex((item) => {
      return item.id === id;
    });
    if (index !== -1) {
      state.popups.splice(index, 1);
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