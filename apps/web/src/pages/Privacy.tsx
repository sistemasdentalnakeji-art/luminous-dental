import { LegalDocument } from '@/components/LegalDocument'
import { privacy } from '@/content/legal'
import { useLang } from '@/lib/lang'

export default function Privacy() {
  return <LegalDocument doc={privacy[useLang()]} />
}
