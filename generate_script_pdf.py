"""
generate_script_pdf.py - Generates an executive-ready PDF script for MARIVANCE 3-minute video demo
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont('Helvetica', 8)
        self.setFillColor(colors.HexColor('#64748B'))
        # Top Header
        self.drawString(54, 750, 'MARIVANCE : 3-Minute Video Demo Script & Presentation Guide')
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)
        # Bottom Footer
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, 'CONFIDENTIAL & PROPRIETARY • SMART INDIA HACKATHON (MINISTRY OF STEEL)')
        self.drawRightString(558, 32, f'Page {self._pageNumber} of {page_count}')
        self.restoreState()

def build_pdf():
    pdf_path = 'MARIVANCE_Demo_Video_Script.pdf'
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=60,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0284C7'),
        spaceAfter=10
    )

    h2_style = ParagraphStyle(
        'H2Style',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155'),
        spaceAfter=4
    )

    vo_style = ParagraphStyle(
        'VoiceOver',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor('#0369A1'),
        leftIndent=10,
        rightIndent=10,
        spaceAfter=6
    )

    action_style = ParagraphStyle(
        'ActionStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#B45309'),
        spaceAfter=3
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph('🎬 MARIVANCE Demo Video Script', title_style))
    story.append(Paragraph('<b>3-Minute Executive Pitch & Walkthrough Guide</b> • Ministry of Steel / SAIL Logistics DSS', subtitle_style))
    story.append(HRFlowable(width='100%', thickness=1.5, color=colors.HexColor('#0284C7'), spaceBefore=2, spaceAfter=8))

    # Cue Table
    cue_data = [
        [Paragraph('<b>Timestamp</b>', body_style), Paragraph('<b>Section / Tab</b>', body_style), Paragraph('<b>Screen Action</b>', body_style), Paragraph('<b>Key Highlights</b>', body_style)],
        ['0:00 - 0:30', 'Intro & Hero', 'Scroll Landing Page, click Open Dashboard', 'SAIL/RINL coking coal $35M-$60M demurrage problem'],
        ['0:30 - 1:05', 'Live Simulator', 'Set Hay Point to Paradip (150k MT), 3D Globe', 'XGBoost ML (R2=92.01%), BDI ticker, 4900 NM route'],
        ['1:05 - 1:35', 'Waterline Feasibility', 'Show Draft vs LOA limit clearance charts', 'Capesize blocked at Paradip (16.5m) & Haldia (8.5m)'],
        ['1:35 - 2:10', 'Fleet Optimizer', 'Display recommended 2x Panamax fleet', 'PuLP MILP solver, 10% volume discount, zero slack'],
        ['2:10 - 2:35', 'Operational Alerts', 'Highlight congestion & Gangavaram savings', 'Demurrage risk ($22k/day), $78k diversion arbitrage'],
        ['2:35 - 3:00', 'Copilot & Matrix', 'Query Copilot (Haldia route), Port Matrix', 'Dynamic NLP Copilot, terminal database, conclusion']
    ]

    cue_table = Table(cue_data, colWidths=[65, 90, 170, 175])
    cue_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(cue_table)
    story.append(Spacer(1, 8))

    # Script Sections
    sections = [
        (
            'Part 1: Introduction & The Problem Statement (0:00 – 0:30)',
            'Start on landing page (localhost:3000). Scroll hero section, showcase ML/MILP metric cards, click "Open Dashboard".',
            '"Hello everyone. Today, I am excited to present MARIVANCE — an AI-Powered Maritime Decision Support and Prescriptive Fleet Optimization System built for the Ministry of Steel and India\'s major steel producers like SAIL and RINL.<br/><br/>India imports over 15 to 20 Million Tonnes of metallurgical coking coal annually from Australia, Russia, and the US. However, extreme freight market volatility, port congestion, and rigid draft constraints cause tens of millions of dollars in demurrage penalties and freight inefficiencies each year.<br/><br/>MARIVANCE solves this by fusing XGBoost Machine Learning, PuLP Mixed-Integer Linear Programming, and real-time Maritime Intelligence."'
        ),
        (
            'Part 2: Tab 1 — Live Simulator & 3D Geospatial Command (0:30 – 1:05)',
            'Inside dashboard, set Origin = Hay Point, Destination = Paradip, Volume = 150,000 MT. Hover over 3D globe and KPI cards.',
            '"Let\'s enter our main command dashboard. First, in the Live Simulator, logistics officers can simulate any international voyage.<br/><br/>Here, I am setting a 150,000 MT coking coal shipment from Hay Point, Australia to Paradip Port. Instantly, our XGBoost Regressor model (with 92.01% R² accuracy) predicts the forward freight rate based on live Baltic Dry Index (BDI) and marine bunker fuel prices.<br/><br/>Notice the 3D globe rendering the great-circle sea lanes and calculating the exact 4,900 Nautical Mile transit."'
        ),
        (
            'Part 3: Tab 2 — Waterline Feasibility & Physical Gatekeeper (1:05 – 1:35)',
            'Click "Waterline Feasibility" in sidebar. Point to draft/LOA clearance bars and red blocked vessel badges.',
            '"Next is the Waterline Feasibility engine. In maritime logistics, chartering a vessel that is too large causes catastrophic groundings.<br/><br/>This tab acts as an automated physical gatekeeper. For Paradip, with its 16.5m draft, a fully laden Capesize vessel requiring 17.5m draft is strictly flagged as Blocked to protect Under-Keel Clearance (UKC). At shallow riverine ports like Haldia (8.5m draft), the system automatically restricts chartering to Handysize vessels."'
        ),
        (
            'Part 4: Tab 3 — Fleet Optimizer (PuLP MILP Solver) (1:35 – 2:10)',
            'Click "Fleet Optimizer". Highlight the 2x Panamax allocation card and cost breakdown chart.',
            '"Now, the core mathematics: the Fleet Optimizer tab.<br/><br/>Using PuLP Mixed-Integer Linear Programming (MILP) with the CBC solver, MARIVANCE solves for the globally cost-optimal fleet combination within 50 milliseconds.<br/><br/>For our 150,000 MT cargo to Paradip, instead of risking an infeasible Capesize, the solver prescribes 2x Panamax bulk carriers (75,000 MT each). This fulfills 100% of the volume, captures a 10% economy-of-scale discount, and eliminates unutilized deadweight slack."'
        ),
        (
            'Part 5: Tab 4 — Operational Alerts & Demurrage Radar (2:10 – 2:35)',
            'Click "Operational Alerts". Highlight port queue times and the Gangavaram Diversion Arbitrage card.',
            '"Under Operational Alerts, we tackle the multi-million dollar issue of Demurrage.<br/><br/>Paradip faces high pre-berthing queues averaging 4.8 days, triggering over $100,000 in laytime penalties. The system computes a Deepwater Diversion Arbitrage: by diverting cargo to Gangavaram Port — which has an automated 1.1-day turnaround — SAIL saves up to $78,000 net per voyage."'
        ),
        (
            'Part 6: Tab 5 & 6 — AI Copilot, Port Matrix & Conclusion (2:35 – 3:00)',
            'Click "AI Copilot", ask "what are the conditions of the haldia to australia", show response. Briefly show Port Matrix.',
            '"Finally, we have the Logistics AI Copilot. Decision-makers can ask natural language questions in real-time. For example, asking about Haldia to Australia immediately provides the exact 8.5m tidal river draft constraints, 4,920 NM distance, and lighterage recommendations.<br/><br/>The Port Matrix tab provides a single source of truth for all Indian coal terminals.<br/><br/>In summary, MARIVANCE transforms complex maritime variables into actionable, mathematical decision intelligence — reducing freight costs and securing India\'s strategic raw material supply chain. Thank you!"'
        )
    ]

    for title, action, vo in sections:
        sec_elements = []
        sec_elements.append(Paragraph(title, h2_style))
        sec_elements.append(Paragraph(f'<b>[VISUAL ACTION]:</b> {action}', action_style))
        sec_elements.append(Paragraph(vo, vo_style))
        sec_elements.append(Spacer(1, 4))
        story.append(KeepTogether(sec_elements))

    # Recording Tips box
    story.append(Spacer(1, 6))
    tips_data = [
        [Paragraph('<b>🎙️ Pro Recording Tips:</b> • <b>Resolution:</b> 1080p Fullscreen (<code>F11</code>) • <b>Pacing:</b> ~30s per section • <b>Cursor:</b> Smooth mouse movement when highlighting KPI badges.', body_style)]
    ]
    tips_table = Table(tips_data, colWidths=[500])
    tips_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#0284C7')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tips_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print("SUCCESS: MARIVANCE_Demo_Video_Script.pdf generated successfully.")

if __name__ == '__main__':
    build_pdf()
