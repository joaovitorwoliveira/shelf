# Workflow

How work moves from an idea to `master`. Agents follow these rules too.

## Branches

- `master`: stable. Only receives PRs from `development`, merged with a merge commit.
- `development`: the default branch and the base for all work.
- Work branches: `<type>/<issue>-<slug>`, created from `development`. Example: `feat/12-notion-sync`.
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`.
- `master` and `development` are protected: no direct push, no force push, a PR with green CI is required.

## Commits and PRs

- Commits follow Conventional Commits: `<type>(<scope>): <summary>`, imperative, lowercase, no trailing period.
- PRs into `development` are squash-merged. The PR title becomes the commit on `development`, so it follows the same format.
- PR bodies follow the `mattpocock-skills:pr` skill template: Summary (smallest visual: diff, tree or diagram), Evidence (before and after), Merge Danger (one-way or two-way door, blast radius). Load the skill before writing one.
- A PR body links its issue with `Closes #<n>`.
- Release: open a PR from `development` to `master` titled `chore(release): <summary>`.

## Tasks

Every piece of work starts as a GitHub issue. Branch names carry the issue number.

## Agents

- The agent creates the branch, commits, pushes, and opens the PR into `development`.
- The author reviews and merges. The agent never merges and never pushes to `master` or `development`.
- Before opening a PR, `pnpm lint`, `pnpm build`, `pnpm test` and `pnpm test:e2e` pass locally.

## CI

`.github/workflows/ci.yml` runs two jobs, both required to merge:

- `checks`: lint, build, unit tests, e2e tests.
- `conventions`: branch name, PR title, and that `master` only receives PRs from `development`.
