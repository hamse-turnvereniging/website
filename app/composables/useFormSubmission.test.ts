import assert from "node:assert/strict";
import test from "node:test";
import { useFormSubmission } from "./useFormSubmission.ts";

test("only confirms submission after the server reports success", async () => {
  const form = useFormSubmission();
  let resolve!: (value: { success: boolean }) => void;
  const response = new Promise<{ success: boolean }>((done) => { resolve = done; });
  const pending = form.submit(() => response);
  assert.equal(form.isSubmitting.value, true);
  assert.equal(form.submitted.value, false);
  resolve({ success: true });
  assert.equal(await pending, true);
  assert.equal(form.submitted.value, true);
  assert.equal(form.isSubmitting.value, false);
});

test("keeps the form available after a rejected response and allows retry", async () => {
  const form = useFormSubmission();
  assert.equal(await form.submit(async () => ({ success: false })), false);
  assert.equal(form.submitted.value, false);
  assert.equal(form.isSubmitting.value, false);
  assert.equal(await form.submit(async () => ({ success: true })), true);
});

test("handles network failures without confirming submission", async () => {
  const form = useFormSubmission();
  assert.equal(await form.submit(async () => { throw new Error("Offline"); }), false);
  assert.equal(form.submitted.value, false);
  assert.equal(form.isSubmitting.value, false);
});

test("prevents duplicate requests while sending and after success", async () => {
  const form = useFormSubmission();
  let requests = 0;
  const request = async () => { requests++; return { success: true }; };
  const pending = form.submit(request);
  await form.submit(request);
  await pending;
  await form.submit(request);
  assert.equal(requests, 1);
  form.startAgain();
  assert.equal(form.submitted.value, false);
  await form.submit(request);
  assert.equal(requests, 2);
});
