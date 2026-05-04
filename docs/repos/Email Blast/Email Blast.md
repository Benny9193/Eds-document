# Email Blast

> Legacy Clarion email-blast application. Single-commit repo — initial source archive.

| | |
|---|---|
| **Project** | [Email Blast](https://dev.azure.com/EDSIQ/Email%20Blast) |
| **Repo** | [Email Blast](https://dev.azure.com/EDSIQ/Email%20Blast/_git/Email%20Blast) |
| **Default branch** | `main` |
| **Size** | 0 bytes (per `repo_list_repos_by_project`) — but source exists in tree |
| **Created** | 2025-10-06 |
| **Status** | Source archived — single initial commit, no further activity |
| **Clone (HTTPS)** | `https://EDSIQ@dev.azure.com/EDSIQ/Email%20Blast/_git/Email%20Blast` |
| **Clone (SSH)** | `git@ssh.dev.azure.com:v3/EDSIQ/Email%20Blast/Email%20Blast` |

## At a glance

**Clarion** desktop application for email blasts. Source-only — no README, no build, no pipelines. Project description: *"Email Blast Clarion program."*

The size-0 reading from the project listing is misleading; the repo has 19 files in a single commit (size may not have been recomputed by ADO since the initial push).

## Repository layout

```
/
└── Clarion Source/
    ├── EmailBlast.clw          ← main Clarion source
    ├── EmailBlast.cwproj       ← Clarion project file
    ├── EmailBlast.sln          ← solution file
    ├── EmailBlast001.clw, EmailBlast006.clw, EmailBlast007.clw,
    ├── EmailBlast008.clw, EmailBlast009.clw, EmailBlast011.clw,
    ├── EmailBlast012.clw, EmailBlast018.clw, EmailBlast019.clw,
    ├── EmailBlast020.clw, EmailBlast021.clw, EmailBlast022.clw,
    ├── EmailBlast023.clw, EmailBlast024.clw, EmailBlast025.clw
    └── EmailBlast_BC1.CLW
```

The numbered modules are non-contiguous (no `…002.clw` through `…005.clw`, gaps at 010, 013–017) — likely a pruned or selectively-committed export from the IDE.

## Tech stack

- **Clarion** (SoftVelocity) — `.clw` source, `.cwproj` project, `.sln` solution

## Branches

| Branch | Notes |
|---|---|
| `main` | only branch |

## Recent activity

| Date (UTC) | Author | Comment |
|---|---|---|
| 2025-10-06 19:24 | David Harrison | Initial Commit *(19 files added)* |

## Pull requests

None.

## Build pipelines

None.

## Notes & flags

- ⚠️ No README at any level. The repo size showing as 0 in the project listing is suspicious — the actual on-disk content is 19 Clarion files.
- Numbered Clarion module gaps (002–005, 010, 013–017) suggest the export is incomplete or files were intentionally omitted before the initial push.
- Like `Bid Manager`, this is a source-archive repo rather than an active dev tree — a single "Initial Commit" is the entire history.

## Source links

- [Repo home](https://dev.azure.com/EDSIQ/Email%20Blast/_git/Email%20Blast)
