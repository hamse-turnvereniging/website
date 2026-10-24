import { nextTick, ref, type Ref } from "vue";

export function useFormResetFocus(formTitle: Readonly<Ref<HTMLElement | null>>) {
  const resetModalOpen = ref(false);
  let focusAfterClose = false;

  function focusForm() {
    nextTick(() => {
      formTitle.value?.focus({ preventScroll: true });
      formTitle.value?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function finishReset(scrollToForm: boolean) {
    if (resetModalOpen.value) {
      // Wait for the dialog to release focus before moving back to the form.
      focusAfterClose = scrollToForm;
      resetModalOpen.value = false;
    } else if (scrollToForm) {
      focusForm();
    }
  }

  function onResetModalClose(event: Event) {
    if (!focusAfterClose) return;

    event.preventDefault();
    focusAfterClose = false;
    focusForm();
  }

  return { resetModalOpen, finishReset, onResetModalClose };
}
