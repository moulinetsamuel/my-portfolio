export function generateCVFileName() {
  return `CV_SAMUEL_MOULINET_${Date.now()}.pdf`;
}

export function generateSkillIconFileName(name: string) {
  return `${Date.now()}-${name.toLowerCase().replace(/\s+/g, '_')}.svg`;
}
