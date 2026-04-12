/**
 * Elementor Pro donation form on Africa Programs WordPress.
 * Submissions must match https://cms-programs.reallifeinstitute.or/get-involved/donations/
 */
export const ELEMENTOR_DONATE_AJAX =
  "https://cms-programs.reallifeinstitute.or/wp-admin/admin-ajax.php";

export const ELEMENTOR_DONATE_FORM = {
  postId: "414",
  formId: "3021d892",
  queriedId: "414",
  refererTitle: "Donate – Real Life Research Institute Africa Program",
} as const;

/** Field keys sent to Elementor (form_fields[...] names). */
export type ElementorDonatePayload = {
  name: string;
  email: string;
  /** Phone — Elementor field id is still `message` on the legacy form */
  phone: string;
  organisationOrIndividual: "Organisation" | "Individual";
  donationType: "Monetary Donation" | "In-kind Donation";
  description: string;
  paymentMethod: "Credit Card" | "Cheque" | "Bank Transfer" | "Gift Card";
  comments: string;
};

export function buildElementorDonateBody(data: ElementorDonatePayload): URLSearchParams {
  const p = new URLSearchParams();
  p.set("action", "elementor_pro_forms_send_form");
  p.set("post_id", ELEMENTOR_DONATE_FORM.postId);
  p.set("form_id", ELEMENTOR_DONATE_FORM.formId);
  p.set("queried_id", ELEMENTOR_DONATE_FORM.queriedId);
  p.set("referer_title", ELEMENTOR_DONATE_FORM.refererTitle);

  p.set("form_fields[name]", data.name.trim());
  p.set("form_fields[email]", data.email.trim());
  p.set("form_fields[message]", data.phone.trim());
  p.set("form_fields[field_88cff67]", data.organisationOrIndividual);
  p.set("form_fields[field_d923a16]", data.donationType);
  p.set("form_fields[field_abe55bf]", data.description.trim());
  p.set("form_fields[field_2ba776b]", data.paymentMethod);
  p.set("form_fields[field_5994c9b]", data.comments.trim());

  return p;
}
