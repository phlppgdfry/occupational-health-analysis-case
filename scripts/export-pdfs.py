#!/usr/bin/env python3
"""Create a one-page summary and a readable casebook. Optional dependency: reportlab."""
from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'site/downloads'
OUT.mkdir(parents=True,exist_ok=True)
INK=colors.HexColor('#172e3a');TEAL=colors.HexColor('#087e83');MUTED=colors.HexColor('#526981');PALE=colors.HexColor('#f5f7fa')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='AsterTitle',fontName='Helvetica-Bold',fontSize=28,leading=32,textColor=INK,spaceAfter=16))
styles.add(ParagraphStyle(name='AsterH1',fontName='Helvetica-Bold',fontSize=21,leading=26,textColor=INK,spaceBefore=8,spaceAfter=14,keepWithNext=True))
styles.add(ParagraphStyle(name='AsterH2',fontName='Helvetica-Bold',fontSize=14,leading=18,textColor=TEAL,spaceBefore=12,spaceAfter=7,keepWithNext=True))
styles.add(ParagraphStyle(name='AsterBody',fontName='Helvetica',fontSize=10,leading=14,textColor=INK,spaceAfter=6))
styles.add(ParagraphStyle(name='AsterSmall',fontName='Helvetica',fontSize=8.5,leading=12,textColor=MUTED,spaceAfter=7))
styles.add(ParagraphStyle(name='AsterCell',fontName='Helvetica',fontSize=7.7,leading=11,textColor=INK))
styles.add(ParagraphStyle(name='AsterCode',fontName='Courier',fontSize=8,leading=11,textColor=MUTED,spaceAfter=6))

def footer(canvas,doc):
    canvas.setStrokeColor(colors.HexColor('#dde5ec'));canvas.line(42,40,A4[0]-42,40)
    canvas.setFont('Helvetica',8);canvas.setFillColor(MUTED)
    canvas.drawString(42,26,'Aster Preventie | Fictieve portfolio-case | 2026')
    canvas.drawRightString(A4[0]-42,26,str(doc.page))

def doc(name,story):
    SimpleDocTemplate(str(OUT/name),pagesize=A4,leftMargin=42,rightMargin=42,topMargin=38,bottomMargin=50,title='Aster Preventie - Software Analysis Case',author='Philippe Godfroy').build(story,onFirstPage=footer,onLaterPages=footer)

def text(value):
    value=value.replace('→',' -> ').replace('×',' x ').replace('—',' - ').replace('–',' - ').replace('’',"'").replace('“','"').replace('”','"').replace('≥',' >= ').replace('é','é')
    value=re.sub(r'!?\[([^\]]+)\]\(([^)]+)\)',r'\1',value)
    value=escape(value)
    value=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',value)
    value=re.sub(r'`([^`]+)`',r'<font name="Courier">\1</font>',value)
    return value

one=[Paragraph('Aster Preventie',styles['AsterTitle']),Paragraph('Software analysis case - van aanvraag tot herplanning',styles['AsterH2']),Paragraph('Een fictieve preventiedienst plant administratieve onderzoeken vanuit losse lijsten. Onvolledige aanvragen, overlappende capaciteit en vergeten annuleringen veroorzaken herstelwerk.',styles['AsterBody'])]
for heading,body in [
('De analyse','Discovery, requirements, proces en state machine, datamodel, API-contract, werkend browserprototype, acceptatietests, UAT-plan, pilot en overdracht vormen één keten.'),
('De kernflow','Gegevens aanvullen -> passende afspraak boeken -> met reden annuleren -> capaciteit vrij -> expliciet heropenen -> bewust een nieuwe datum kiezen.'),
('Drie beslissingen','Eerst volledige gegevens, dan reserveren. Toets intervalconflicten voor arts, kamer en medewerker. Scheid annulering van herplanning.'),
('Het bewijs','P-03 -> FR-04 -> R-04 -> AC-15 -> K-04. De acceptatietest annuleert een afspraak en boekt daarna een ander dossier op de vrijgekomen plek.'),
('Grenzen','Fictieve data. Geen medische dossiers, echte login, servertransacties of berichtaflevering. KPI-getallen zijn illustratieve aannames, geen behaalde resultaten. Geen echte klant-UAT of productie-implementatie.')]:
    one.extend([Paragraph(heading,styles['AsterH2']),Paragraph(text(body),styles['AsterBody'])])
one.extend([Spacer(1,12),Paragraph('<b>Repository</b><br/>github.com/phlppgdfry/occupational-health-analysis-case',styles['AsterSmall']),Paragraph('Independent portfolio case study based on a fictional organisation. No confidential employer information.',styles['AsterSmall'])])
doc('one-pager.pdf',one)

files=['CASE_STUDY.md','docs/00-context/context.md','docs/01-discovery/discovery.md','docs/02-requirements/catalogue.md','docs/02-requirements/functional-spec.md','docs/03-processes/processes.md','docs/04-design/architecture.md','docs/04-design/privacy-security.md','docs/05-integration/contract.md','docs/06-validation/test-strategy.md','docs/06-validation/uat.md','docs/07-delivery/rollout.md','docs/07-delivery/change-request.md','docs/08-handover/user-guide.md','docs/08-handover/runbook.md','docs/09-governance/governance.md','docs/10-value/measurement.md']
story=[Paragraph('Aster Preventie',styles['AsterTitle']),Paragraph('Volledig casebook',styles['AsterH1']),Paragraph('Functionele analyse van een fictieve administratieve planningsmodule.',styles['AsterBody']),Paragraph('Philippe Godfroy | 2026 | Documentatie CC BY 4.0',styles['AsterSmall']),Spacer(1,16),Paragraph('Onafhankelijke portfolio-case. Alle data, organisaties en oefenverslagen zijn fictief. De PDF is een leesexport van de repository; bronbestanden, uitvoerbare tests en exacte diagramnotaties staan in GitHub.',styles['AsterBody']),Paragraph('Leesroute',styles['AsterH2'])]
for i,f in enumerate(files,1):
    title=(ROOT/f).read_text().splitlines()[0].lstrip('# ')
    story.append(Paragraph(f'{i:02d}. {text(title)}',styles['AsterSmall']))
for f in files:
    story.append(PageBreak());lines=(ROOT/f).read_text().splitlines();i=0;code=False
    while i<len(lines):
        line=lines[i]
        if line.startswith('```'):
            language=line[3:];i+=1;block=[]
            while i<len(lines) and not lines[i].startswith('```'):
                block.append(lines[i]);i+=1
            if language == 'mermaid':
                story.append(Paragraph('Relaties uit het model (gerenderde notatie in de repository):',styles['AsterSmall']))
            for c in block:story.append(Paragraph(text(c),styles['AsterCode']))
            i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].startswith('|'):
                cells=lines[i].strip('|').split('|')
                if not all(re.fullmatch(r'\s*:?[-]+:?\s*',c) for c in cells):rows.append([Paragraph(text(c.strip()),styles['AsterCell']) for c in cells])
                i+=1
            if rows:
                cols=max(len(r) for r in rows);width=(A4[0]-84)/cols
                table=Table(rows,colWidths=[width]*cols,repeatRows=1,hAlign='LEFT')
                table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,0),.6,TEAL),('LINEBELOW',(0,1),(-1,-1),.3,colors.HexColor('#dde5ec')),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
                story.extend([table,Spacer(1,10)])
            continue
        if line.startswith('# '):story.append(Paragraph(text(line[2:]),styles['AsterH1']))
        elif line.startswith('## '):story.append(Paragraph(text(line[3:]),styles['AsterH2']))
        elif line.startswith('### '):story.append(Paragraph(text(line[4:]),styles['AsterH2']))
        elif line.startswith('!['):
            image=ROOT/'docs/diagrams/to-be.png'
            if image.exists(): story.extend([Image(str(image),width=A4[0]-84,height=(A4[0]-84)*330/1100),Spacer(1,12)])
            else: story.append(Paragraph('Procesoverzicht: zie repository, docs/diagrams/.',styles['AsterSmall']))
        elif line.startswith(('Vorige:', 'Volgende:', 'Terug:', 'Bij een echte supportmelding:')): pass  # navigation / duplicate runbook instruction
        elif line.strip():story.append(Paragraph(text(line.lstrip('> ')),styles['AsterBody']))
        i+=1
doc('casebook.pdf',story)
print('Created one-pager.pdf and casebook.pdf from repository sources.')
