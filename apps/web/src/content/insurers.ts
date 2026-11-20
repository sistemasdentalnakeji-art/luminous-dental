// Insurance plans shown on /insurance-financing. Same 24 logos and order as Dental Nakeji, by the owner's decision (19-11-2026).
// The clinic must still confirm that this list applies to Luminous Dental (docs/datos.md, POR CONFIRMAR). The official Luminous list differs.
// Files live in public/insurers/ (some file names have typos; they are internal). Each row: [name, file, width, height].
export const insurers: [string, string, number, number][] = [
  ['Aetna', 'aetna', 480, 124],
  ['AlwaysCare', 'alwayscare', 480, 115],
  ['Ameritas', 'ameritas', 480, 99],
  ['Anthem', 'anthem', 480, 109],
  ['BeneSys', 'benesys', 480, 113],
  ['Cigna', 'cigna', 480, 161],
  ['Delta Dental', 'delta-dental', 480, 54],
  ['Dental Health Services', 'dental-health-services', 480, 76],
  ['Guardian', 'guardian', 480, 89],
  ['HealthSCOPE Benefits', 'healt-scope-benefits', 365, 138],
  ['HealthComp', 'health-comp', 480, 78],
  ['Horizon', 'horizon', 480, 119],
  ['Humana', 'humana', 480, 99],
  ['Lincoln Financial Group', 'lincon-financial-group', 480, 154],
  ['MetLife', 'metlife', 480, 104],
  ['Premera Blue Cross', 'premera-blue-cross', 480, 128],
  ['Premier Insurance Company', 'premier-insurance-company', 480, 100],
  ['Principal', 'principal', 480, 135],
  ['Regence', 'regence', 480, 113],
  ['Renaissance', 'renaissance', 480, 90],
  ['Summit', 'summit', 480, 146],
  ['UFCW', 'ufcw', 480, 131],
  ['UnitedHealthcare', 'united-healthcare', 480, 151],
  ['Unum', 'unum', 480, 144],
]

// Texts NEW, for approval (docs/datos.md). They do not say "we accept": the clinic has not confirmed it.
export const insuranceText = {
  eyebrow: 'Insurance',
  title: 'Insurance & Financing',
  lead: 'Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you.',
  steps: ['Tell us your plan', 'Our team goes over it with you', 'Request your appointment'],
  book: 'Request an appointment',
  gridTitle: 'Insurance plans on our list',
  note: 'Logos belong to their owners. Ask us to confirm your plan.',
  payment: 'Questions about payment? Ask our team.',
} as const
