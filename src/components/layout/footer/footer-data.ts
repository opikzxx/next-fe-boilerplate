type FooterCertification = {
  id: string;
  altKey: string;
  labelKey: string;
};

const footerCertifications: FooterCertification[] = [
  { id: "iso9001", altKey: "cert_iso9001_alt", labelKey: "cert_iso9001_label" },
  { id: "iso27001", altKey: "cert_iso27001_alt", labelKey: "cert_iso27001_label" },
  { id: "itil", altKey: "cert_itil_alt", labelKey: "cert_itil_label" },
  { id: "lkpp", altKey: "cert_lkpp_alt", labelKey: "cert_lkpp_label" },
  { id: "ecatalogue", altKey: "cert_ecatalogue_alt", labelKey: "cert_ecatalogue_label" },
];

export { footerCertifications };
export type { FooterCertification };
