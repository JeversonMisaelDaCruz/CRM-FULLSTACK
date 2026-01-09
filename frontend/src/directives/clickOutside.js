export const clickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Verificar se o clique foi fora do elemento
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
