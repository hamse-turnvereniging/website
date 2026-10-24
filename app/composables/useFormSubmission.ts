import { ref } from "vue";

export function useFormSubmission() {
  const submitted = ref(false);
  const isSubmitting = ref(false);

  async function submit(request: () => Promise<{ success: boolean }>) {
    if (isSubmitting.value || submitted.value) return;

    isSubmitting.value = true;

    try {
      const response = await request();

      submitted.value = response.success === true;

      return submitted.value;
    } catch {
      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  function startAgain() {
    if (!isSubmitting.value) submitted.value = false;
  }

  return { submitted, isSubmitting, submit, startAgain };
}
