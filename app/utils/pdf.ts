import { elementById, EXAM_RULES } from '~/data/elements'
import { formatDuration, trackLabel, type ExamResult } from './exam'

const ink: [number, number, number] = [10, 20, 31]
const signal: [number, number, number] = [232, 97, 28]
const pass: [number, number, number] = [47, 143, 91]
const fail: [number, number, number] = [194, 59, 46]
const light: [number, number, number] = [233, 225, 210]
const gray: [number, number, number] = [107, 127, 145]
const white: [number, number, number] = [255, 255, 255]

function clean(value: string): string {
  return value
    .replace(/\u2014|\u2013/g, '-')
    .replace(/\u2019/g, "'")
    .replace(/\u00b7/g, '|')
    .replace(/\u2026/g, '...')
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
}

function safeFilename(result: ExamResult): string {
  const name = result.config.name
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  const date = result.completedAt.slice(0, 10)
  return `NTC-Mock-Result-${name || 'Candidate'}-${date}.pdf`
}

export async function downloadResultPdf(result: ExamResult): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const pageWidth = 210
  const margin = 16
  const contentWidth = pageWidth - margin * 2

  const outcomeLabel =
    result.outcome === 'pass' ? 'PASS' : result.outcome === 'class-d-eligible' ? 'CLASS D ELIGIBLE' : 'FAIL'
  const outcomeColor = result.outcome === 'pass' ? pass : result.outcome === 'class-d-eligible' ? signal : fail

  // Header
  doc.setFillColor(...ink)
  doc.rect(0, 0, pageWidth, 48, 'F')

  doc.setFillColor(...white)
  doc.roundedRect(margin, 12, 14, 14, 3, 3, 'F')
  doc.setFillColor(...signal)
  doc.circle(margin + 7, 22, 2.1, 'F')
  doc.setDrawColor(...signal)
  doc.setLineWidth(0.9)
  doc.circle(margin + 7, 22, 4.2, 'S')

  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('NTC REVIEWER', margin + 19, 17)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 195, 200)
  doc.text('Philippine amateur radio | mock examination', margin + 19, 22)

  doc.setFontSize(7)
  doc.setTextColor(160, 168, 176)
  doc.text('PRACTICE RESULT', pageWidth - margin, 16, { align: 'right' })
  doc.text('Not an official NTC rating', pageWidth - margin, 21, { align: 'right' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(19)
  doc.setTextColor(...white)
  doc.text('Mock Examination Result', margin, 38)

  // Candidate block
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.8)
  doc.setTextColor(...gray)
  doc.text('CANDIDATE', margin, 57)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...ink)
  let displayName = clean(result.config.name)
  let nameSize = 16
  while (nameSize > 10 && doc.getTextWidth(displayName) > 118) {
    nameSize -= 1
    doc.setFontSize(nameSize)
  }
  if (doc.getTextWidth(displayName) > 118) {
    while (displayName.length > 3 && doc.getTextWidth(`${displayName}...`) > 118) {
      displayName = displayName.slice(0, -1)
    }
    displayName = `${displayName}...`
  }
  doc.text(displayName, margin, 64)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...gray)
  doc.text(`${trackLabel(result.track)} | ${result.track === 'D' ? 'Element 2' : 'Elements 2, 3, 4'}`, margin, 72)
  doc.text(`Completed ${formatDate(result.completedAt)} | Time used ${formatDuration(result.durationSec)}`, margin, 77.5)

  // Stamp
  doc.setDrawColor(...outcomeColor)
  doc.setLineWidth(1.1)
  doc.roundedRect(148, 52, 46, 22, 2.5, 2.5, 'S')
  doc.setTextColor(...outcomeColor)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.text('RESULT', 171, 59, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(outcomeLabel.length > 10 ? 9 : 15)
  doc.text(outcomeLabel, 171, 68, { align: 'center' })

  // Overall panel
  doc.setFillColor(...ink)
  doc.roundedRect(margin, 84, contentWidth, 28, 3, 3, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.8)
  doc.setTextColor(170, 180, 190)
  doc.text('OVERALL AVERAGE', margin + 6, 92)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(...white)
  doc.text(`${result.overall}%`, margin + 6, 105)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(190, 198, 206)
  doc.text(`${EXAM_RULES.passAverage}% average to pass | ${EXAM_RULES.elementFloor}% minimum per element`, pageWidth - margin - 6, 100, {
    align: 'right',
  })
  const outcomeLine =
    result.outcome === 'pass'
      ? 'All requirements met in this attempt.'
      : result.outcome === 'class-d-eligible'
        ? 'Element 2 passed; Class D eligibility applies.'
        : 'One or more requirements were not met.'
  doc.text(outcomeLine, pageWidth - margin - 6, 105, { align: 'right' })

  // Element table
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...ink)
  doc.text('ELEMENT BREAKDOWN', margin, 122)

  const tableTop = 126
  const rowHeight = 13
  const colElement = margin
  const colScore = 82
  const colCorrect = 126
  const colTime = 150
  const colStatus = 174

  doc.setFillColor(...ink)
  doc.roundedRect(margin, tableTop, contentWidth, 8, 1.5, 1.5, 'F')
  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.6)
  doc.text('ELEMENT', colElement + 3, tableTop + 5.2)
  doc.text('SCORE', colScore + 3, tableTop + 5.2)
  doc.text('CORRECT', colCorrect + 3, tableTop + 5.2)
  doc.text('TIME', colTime + 3, tableTop + 5.2)
  doc.text('STATUS', colStatus + 3, tableTop + 5.2)

  result.elements.forEach((element, index) => {
    const meta = elementById(element.element)
    const y = tableTop + 8 + index * rowHeight
    if (index % 2 === 0) {
      doc.setFillColor(246, 242, 234)
      doc.rect(margin, y, contentWidth, rowHeight, 'F')
    }
    doc.setDrawColor(...light)
    doc.setLineWidth(0.15)
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...ink)
    doc.text(`Element ${element.element}`, colElement + 3, y + 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.6)
    doc.setTextColor(...gray)
    doc.text(clean(meta?.shortName ?? ''), colElement + 3, y + 9)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...ink)
    doc.text(`${element.percent}%`, colScore + 3, y + 5)
    doc.setFillColor(...light)
    doc.roundedRect(colScore + 3, y + 7.4, 32, 1.8, 0.9, 0.9, 'F')
    const barColor: [number, number, number] =
      element.percent >= EXAM_RULES.passAverage ? pass : element.percent >= EXAM_RULES.elementFloor ? signal : fail
    doc.setFillColor(barColor[0], barColor[1], barColor[2])
    doc.roundedRect(colScore + 3, y + 7.4, (32 * element.percent) / 100, 1.8, 0.9, 0.9, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...ink)
    doc.text(`${element.correct}/${element.total}`, colCorrect + 3, y + 5.5)
    doc.setTextColor(...gray)
    doc.setFontSize(7)
    doc.text(formatDuration(element.timeUsedSec), colTime + 3, y + 5.5)

    const status = element.percent >= EXAM_RULES.passAverage ? '70+' : element.percent >= EXAM_RULES.elementFloor ? 'FLOOR' : 'LOW'
    const statusColor: [number, number, number] = status === '70+' ? pass : status === 'FLOOR' ? signal : fail
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.6)
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2])
    doc.text(status, colStatus + 3, y + 5.5)
  })

  // Class D fallback note
  let cursorY = tableTop + 8 + result.elements.length * rowHeight + 5
  if (result.outcome === 'class-d-eligible') {
    doc.setFillColor(251, 230, 214)
    doc.roundedRect(margin, cursorY, contentWidth, 14, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...signal)
    doc.text('CLASS D ELIGIBILITY', margin + 4, cursorY + 5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.8)
    doc.setTextColor(...ink)
    const note = doc.splitTextToSize(
      'Element 2 is at or above the 50% floor. Under MC 03-08-2012, a Class C candidate who passes Element 2 may be eligible for a Class D license. The NTC makes the final determination.',
      contentWidth - 8,
    )
    doc.text(note.slice(0, 2), margin + 4, cursorY + 9)
    cursorY += 19
  }

  // Weak topics
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...ink)
  doc.text('WHERE TO REVIEW NEXT', margin, cursorY + 3)
  cursorY += 8

  if (result.weakTopics.length === 0) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...pass)
    doc.text('No missed topics in this attempt.', margin, cursorY + 2)
  } else {
    for (const topic of result.weakTopics.slice(0, 6)) {
      if (cursorY > 258) break
      doc.setFillColor(...signal)
      doc.circle(margin + 1.5, cursorY + 1.8, 0.9, 'F')
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...ink)
      const lines = doc.splitTextToSize(clean(topic.topic), 125)
      doc.text(lines.slice(0, 1), margin + 5, cursorY + 3)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(...gray)
      doc.text(`${topic.wrong} of ${topic.total} missed`, pageWidth - margin, cursorY + 3, { align: 'right' })
      cursorY += 7
    }
  }

  // Footer
  doc.setDrawColor(...light)
  doc.setLineWidth(0.3)
  doc.line(margin, 268, pageWidth - margin, 268)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(...gray)
  const disclaimer = doc.splitTextToSize(
    'This is an independent practice result, not an official NTC rating. Scores are estimates based on a 70% average and a 50% per-element floor. Verify all requirements and schedules with the National Telecommunications Commission.',
    contentWidth,
  )
  doc.text(disclaimer, margin, 273)
  doc.text(`Generated ${formatDate(new Date().toISOString())} | ntc-reviewer`, margin, 289)
  doc.text('Page 1 of 1', pageWidth - margin, 289, { align: 'right' })

  doc.save(safeFilename(result))
}
