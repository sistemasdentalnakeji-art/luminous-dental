import { LegalDocument } from '@/components/LegalDocument'
import { terms } from '@/content/legal'
import { useLang } from '@/lib/lang'

export default function Terms() {
  return <LegalDocument doc={terms[useLang()]} />
}
