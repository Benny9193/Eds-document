# Bid Manager

> Legacy Clarion bid-management application. Source-only repo (no build pipelines, no deployment scripts in tree).

| | |
|---|---|
| **Project** | [Bid Manager](https://dev.azure.com/EDSIQ/Bid%20Manager) |
| **Repo** | [Bid Manager](https://dev.azure.com/EDSIQ/Bid%20Manager/_git/Bid%20Manager) |
| **Default branch** | `main` |
| **Size** | 4.7 MB |
| **Created** | 2025-05-21 |
| **Status** | Source archived — last commit 2025-10-05 |
| **Clone (HTTPS)** | `https://EDSIQ@dev.azure.com/EDSIQ/Bid%20Manager/_git/Bid%20Manager` |
| **Clone (SSH)** | `git@ssh.dev.azure.com:v3/EDSIQ/Bid%20Manager/Bid%20Manager` |

## At a glance

A pure **Clarion** application — the legacy 4GL/RAD environment by SoftVelocity. No web stack, no Docker, no CI/CD: this repo is essentially a checked-in source tree for the desktop bid-management program. Project description on ADO: *"Bid Manager program written in Clarion."*

## Repository layout

```
/
├── README.md          ← Microsoft template stub (not filled in)
└── app/
    ├── BidMgrRev2.clw         ← main Clarion source
    ├── BidMgrRev2.cwproj      ← Clarion project file
    ├── BidMgrRev2001.clw …    BidMgrRev2024.clw   ← 24 numbered Clarion modules
    ├── BIDMGRREV2001.INC …    BIDMGRREV2024.INC   ← matching include files
    └── readme.md
```

52 entries under `/app` total, in two parallel series of 24 generated `.clw` + `.INC` pairs.

## Tech stack

- **Clarion** (SoftVelocity) — `.clw` source files, `.cwproj` project, `.INC` include files
- No package manager, no build scripts, no Dockerfile — Clarion is built/compiled inside the Clarion IDE rather than from source control

## Branches

| Branch | Notes |
|---|---|
| `main` | only branch |

## Recent activity

Six commits total in the entire repo history:

| Date (UTC) | Author | Comment |
|---|---|---|
| 2025-10-05 23:42 | David Harrison | Saved Bid Manager *(50 edits, 186 deletes — major sync)* |
| 2025-05-21 19:06 | David Harrison | Added 236 files to /app |
| 2025-05-21 19:05 | David Harrison | Added readme.md |
| 2025-05-21 19:04 | David Harrison | Deleted app |
| 2025-05-21 19:04 | David Harrison | Added app |
| 2025-05-21 19:03 | David Harrison | Added README.md |

**Workflow signal:** the commits look like manual snapshot uploads (initial bulk add, then a single "Saved Bid Manager" months later). Clarion source isn't typically version-controlled day-to-day; this repo functions more as periodic backup/archive than as a live development tree.

## Pull requests

None — none ever opened. Single-branch, single-author repo.

## Build pipelines

None.

## Notes & flags

- Build/deploy not represented in source — Clarion compilation lives outside the repo (presumably on a developer's workstation).
- README.md is the Microsoft default placeholder — no content. Same with `app/readme.md`.
- October 2025 commit ("Saved Bid Manager") shows a substantial diff (50 edits + 186 deletes) — likely a snapshot from the developer's working IDE rather than incremental commits.
- Could benefit from documenting in this repo: which Clarion version, where the compile output goes, who currently maintains it.

## Source links

- [Repo home](https://dev.azure.com/EDSIQ/Bid%20Manager/_git/Bid%20Manager)
- [Branches](https://dev.azure.com/EDSIQ/Bid%20Manager/_git/Bid%20Manager/branches)
