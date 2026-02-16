# GDI — Gross Domestic Intelligence Dashboard

> A dual-factor production model for national AI capacity

## Overview

The Global Digital Intelligence (GDI) index models national AI capacity as a **CES production function** of two fundamental physical inputs:
- **Computing (C)**: AI model capability, data center infrastructure, semiconductor manufacturing, GPU access
- **Energy (E)**: Generation capacity, transmission & distribution, storage systems

## Features

| Tab | Description |
|-----|-------------|
| ⚙ Sandbox | Interactive parameter adjustment (α, σ) with real-time GDI recalculation |
| Rankings | 2025 GDI rankings for 19 countries with Leontief/CES toggle |
| Trajectories | Historical (1995–2025) and Monte Carlo projections (2026–2046) |
| C vs E | Computing vs Energy phase space scatter plot |
| GDI↔GDP | Temporal co-evolution trajectories (2020→2046) + AI GDP contribution |
| Feedback | GDI→GDP→Capital→Infrastructure feedback cycle |
| Disruptions | Technology breakthrough scenarios (superconductors, fusion, post-silicon, orbital) |
| Supply Chain | **TSMC disruption modeling** with adjustable duration and recovery curves |
| Sovereign AI | Sovereignty impact on GDI under full/partial/dependent scenarios |
| Deep Dive | Country-specific radar charts, energy mix, and metrics |
| Model | Mathematical framework and learning rates |

## Key Findings

1. **Energy ceiling**: The US leads in compute (C=99.3) but faces diminishing returns due to energy constraints (E=61.3). China's energy surplus (E=74.4) provides latent AI advantage.

2. **China overtakes ~2034**: Driven by balanced C/E growth vs. US compute-heavy strategy.

3. **TSMC vulnerability**: A 6-month disruption reduces global compute by 28.6%. China is disproportionately vulnerable (−22.1%) due to export controls limiting alternative sourcing.

4. **Post-silicon equalizer**: A semiconductor breakthrough would benefit Germany (+105%) and France (+54%) most, while the US gains only +3.3%.

## Tech Stack

- **React 18** + **Recharts** for interactive visualization
- **Vite** for build tooling
- **Vercel** for deployment

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Connected to Vercel for automatic deployment from `main` branch.

## Academic Reference

See the companion paper: *"Global Digital Intelligence: A Dual-Factor Production Model for National AI Capacity"* (manuscript in preparation for Science).

## Model Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| α | 0.55 | Compute share (adjustable in Sandbox) |
| σ | 0.35 | Substitution elasticity (adjustable) |
| Monte Carlo | 2,000 runs | Per-country forward projections |
| Learning rates | Solar 22%, Wind 16%, Battery 20%, AI Chip 37.5% | Wright's Law parameters |

## License

MIT
