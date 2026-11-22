# Shelf

A personal book app: it reads the books the author has read, resolves each to its original work, and recommends similar works the author has not read.

## Reading list

**Reading**:
One entry in the author's Notion reading list: the title and author as typed, a 1-5 rating, a status and the year read. Two Readings that resolve to the same Work are duplicate data.
_Avoid_: Book, entry, log

**Status**:
Where a Reading stands: Read, Paused or Abandoned. Paused means stopped for other reasons and is never a negative signal. Only Abandoned is negative.
_Avoid_: State

**Rating**:
The author's 1-5 score for a Reading.
_Avoid_: Grade, score, stars

## Catalog

**Work**:
The original work a Reading resolves to. Editions and translations of the same text are one Work.
_Avoid_: Book, edition, title

**Match**:
The result of resolving a Reading to a Work: confirmed when a catalog source agrees, unconfirmed otherwise. An unconfirmed Match is flagged for the author, never guessed.
_Avoid_: Resolution, link

## Recommendations

**Candidate**:
A Work the author has not read, pulled in from the subjects of the Works they have read.
_Avoid_: Suggestion, unread book

**Recommendation**:
A Candidate returned for a request.
_Avoid_: Result, suggestion
