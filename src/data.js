// We use 'export' so our React app can import and read this file later.
export const incomingDocuments = [
  {
    id: "SUB-001",
    title: "Tower B - Ground Floor HVAC Layout",
    discipline: "MEP",
    type: "Shop Drawing",
    status: "Pending Routing"
  },
  {
    id: "MAT-089",
    title: "Podium Level - Ceramic Floor Tiles",
    discipline: "Architectural",
    type: "Material Submittal",
    status: "Pending Routing"
  },
  {
    id: "INV-402",
    title: "Main Contractor - Progress Payment 04",
    discipline: "Finance",
    type: "Invoice",
    status: "Pending Routing"
  }
];
// The new RFI Database
export const projectRFIs = [
  {
    id: "RFI-042",
    subject: "KingsRE Tower Lobby - Ceiling Height Clash",
    contractor: "Apex Builders",
    discipline: "Architectural",
    status: "Open",
    dateSubmitted: "2026-02-22"
  },
  {
    id: "RFI-043",
    subject: "KingsRE Villas - Alternate Flooring Material",
    contractor: "Desert Stone LLC",
    discipline: "Civil",
    status: "Closed",
    dateSubmitted: "2026-02-20"
  },
  {
    id: "RFI-044",
    subject: "Basement Parking - Chiller Pipe Routing",
    contractor: "CoolTech MEP",
    discipline: "MEP",
    status: "Open",
    dateSubmitted: "2026-02-23"
  }
];