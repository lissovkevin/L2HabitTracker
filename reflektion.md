# Reflektion: Kodkvalitet och Clean Code

## 1. Tabellreflektion för namngivning (Kapitel 2)

| Namn               | Förklaring                         | Reflektion och regler från Clean Code                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HabitManager`     | Klassnamn på huvudklassen          | **Class Names (s. 25)**: Följer substantiv-regeln men använder "Manager" vilket boken avråder från. **Avoid Disinformation**: "Manager" är vagt och säger inget om vad klassen faktiskt gör. Bättre: `HabitTracker` eller `HabitRepository`.                                                                   |
| `createHabit`      | Metod för att skapa ny vana        | **Use Intention-Revealing Names (s. 18)**: Tydligt vad metoden gör. **Method Names (s. 25)**: Perfekt verb-substantiv kombination. **Make Meaningful Distinctions (s. 20)**: Skiljer sig tydligt från `getHabit` och `deleteHabit`.                                                                            |
| `habitId`          | Parameter för vanans identifierare | **Use Searchable Names (s. 22)**: Mycket lättare att söka än bara "id". **Avoid Mental Mapping (s. 23)**: Ingen översättning behövs - namnet är självförklarande. **Don't Be Cute (s. 21)**: Rakt på sak utan onödiga förkortningar.                                                                           |
| `getCurrentStreak` | Hämtar aktuell streak-längd        | **Use Intention-Revealing Names**: Perfekt - beskriver både vad (get), vilket objekt (Streak) och vilken variant (Current). **Avoid Disinformation (s. 19)**: "Current" eliminerar förvirring med historiska streaks. **Use Problem Domain Names (s. 27)**: "Streak" är etablerat begrepp inom habit tracking. |
| `isStreakBroken`   | Kontrollerar om streak är bruten   | **Method Names (s. 25)**: Följer boolean-konvention med "is"-prefix. **Use Intention-Revealing Names**: Läses som naturlig engelska - "is streak broken?". **Pick One Word per Concept**: Konsekvent användning av "streak" genom hela API:et istället för synonymer som "chain" eller "sequence".             |

### Reflektion

Jag använder konsekvent terminologi vilket är bra, men som sagt bryter `HabitManager` mot bokens råd om att undvika "Manager". Vissa interna variabel namn saknar kontext och kan förbättras.

---

## 2. Kapitelreflektion för Kapitel 2: Meaningful Names

Kapitel 2 handlar om att namn ska avslöja intention utan kommentarer. Namngivning är en av de mest kritiska apsekterna av kodkvalitet eftersom att namnn är överallt i kod - variabler, funktioner, argument, klasser och paket, framhäver Martin i boken.

**Kärnprinciper:**

**Use Intention-Revealing Names (s. 18-19)**
Frågor som: varför existerar det?, vad gör det?, hur används det?, det ska namnet svara på. Om man behöver kommentera ett namn så har det inte avslöjat sin intention. Exempel från boken: `int elapsedTimeInDays;` är bättre än `int d; //elapsed time in days` eftersom att namnet berättar allt.

**Avoid Disinformation (s. 19-20)**
Martin skriver i boken att namn inte ska lämna falska spår som döljer kodens mening. Som han säger ska man inte kalla en grupp av konton för `accountList` om det inte är en `List`. Istället så är det bättre att använda sig av `accounts` eller `accountGroup`.

**Make Meaningful Distinctions (s. 20-21)**
Om namn är olika så ska de också betyda olika. Man ska inte använda sig av såkallade noise words som t.ex: `Info`, `Data`, `the`, `a`, eftersom att det inte skapar meningsfulla distinktioner. Vad är skillnaden på `ProductInfo` och `ProductData`? (exempel från boken) Man kan inte svara på det, vilket gör att namnen blir värdelösa.

**Use Pronounceable Names (s. 21-22)**
Han nämner att människor är bra på ord, och att ord per definiton är uttalbara. Så namn som `genymdhms` (generation date, year, month, day, hour, minute, second) är omöjliga att diskturea normalt, istället så ska man använda ett uttalbart namn som `generationTimestamp` och kan då diskuteras på ett bättre sätt.

**Use Searchable Names (s. 22-23)**
Enkelbokstavsnamn och magiska nummer är svåra att hitta. `MAX_CLASSES_PER_STUDENT` är lätt att söka efter, medan siffran `7` kan dyka upp i alla möjliga sammanhang.

**Class and Method Names (s. 25-26)**
Enligt Clean Code ska klasser och objekt ha substantiv eller substantivfraser som `Customer`, `WikiPage`, `Account`, `AddressParser`. Man ska försöka undvika vaga ord som `Manager`, `Processor`, `Data`, `Info`, vilket jag har dock använt mig av `HabitManager`. Metoder ska ha verb eller verbfraser som `postPayment`, `deletePage`, `save`. Accessors ska prefixas med `get`, mutators med `set` och predikat med `is`.

**Pick One Word per Concept (s. 26)**
Man ska försöka välja ett ord för ett abstrakt koncept och så ska man hålla sig till det. Om man har `fetch`, `retrieve` och `get` som ekvivalenta metoder i olika klasser så kan det bli förvirrande. Konsekvent terminologi gör koden förutsägbar.

**Use Solution Domain Names & Add Context (s. 27-29)**
Använd datavetenskapliga termer som andra programmerare förstår. Namn behöver ofta kontext för att bli meningsfulla - variabler som `firstName`, `lastName`, `street`, `city` bildar tillsammans tydligt en adress, men `state` ensam är oklart.

**Min reflektion:**
Efter att ha läst detta kapitel inser jag att jag ibland använder förkortningar som gör koden svårare att förstå, och att jag inte alltid är konsekvent med terminologi. Vissa av mina variabelnamn saknar tillräcklig kontext. Det viktigaste jag tar med mig är att välvalda namn eliminerar behovet av kommentarer - koden blir självförklarande. Att spendera tid på namngivning är en investering som betalar sig i läsbarhet.

---

## 3. Tabellreflektion för funktioner/metoder (Kapitel 3)

| Metodnamn                          | Rader | Argument | Reflektion och regler från Clean Code                                                                                        |
| ---------------------------------- | ----- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `addCompletion(habitName, date)`   | 12    | 2        | **Small (s. 34-35)**: OK storlek. **Dyadic (s. 42)**: Acceptabelt. **Do One Thing (s. 35-36)**: Validering kunde extraheras. |
| `calculateStreak(completionDates)` | 28    | 1        | **Small (s. 34-35)**: För lång. **Monadic (s. 41)**: Bra form. **Abstraction (s. 36-37)**: Blandar nivåer - bör delas upp.   |
| `getHabits()`                      | 3     | 0        | **Small (s. 34-35)**: Perfekt. **Niladic (s. 40-41)**: Idealiskt. **Command Query (s. 45-46)**: Perfekt query.               |
| `removeHabit(habitName)`           | 8     | 1        | **Small (s. 34-35)**: Bra. **Monadic (s. 41)**: Korrekt. **No Side Effects (s. 44-45)**: Gör vad namnet säger.               |
| `isCompletedOn(habitName, date)`   | 15    | 2        | **Small (s. 34-35)**: OK. **Dyadic (s. 42)**: Nödvändigt. **Command Query (s. 45-46)**: Korrekt query.                       |

### Reflektion

Majoriteten är små och fokuserade. `calculateStreak` är för lång och blandar abstraktionsnivåer. Duplicerad validering bör extraheras enligt DRY (s. 48).

---

## 4. Kapitelreflektion för Kapitel 3: Functions

Kapitel 3 handlar om att skriva små, fokuserade funktioner som gör en sak. Martin visar genom exempel från FitNesse hur komplexa funktioner kan refaktoreras till något mycket mer läsbart och underhållbart.

**Kärnprinciper:**

**Small! (s. 34-35)**
Den första regeln är att funktioner ska vara små. Den andra regeln är att de ska vara ännu mindre. Funktioner ska helst vara under 20 rader. Block inom if/else/while-satser ska vara en rad lång, oftast ett funktionsanrop med ett beskrivande namn.

**Do One Thing (s. 35-36)**
Funktioner ska göra EN sak, göra den bra, och bara göra den. Men vad är "en sak"? Om en funktion endast gör steg som är en abstraktionsnivå under funktionens angivna namn, gör funktionen en sak. Anledningen till att vi skriver funktioner är att dekomponera större koncept till steg på nästa abstraktionsnivå.

**One Level of Abstraction per Function (s. 36-37)**
För att säkerställa att funktioner gör "en sak" måste alla uttryck inom funktionen vara på samma abstraktionsnivå. Att blanda hög-nivå koncept med låg-nivå detaljer är alltid förvirrande. Läsare kan inte avgöra om något är ett viktigt koncept eller bara en implementation-detalj.

**Reading Code from Top to Bottom: The Stepdown Rule (s. 37)**
Vi vill att koden ska läsas som en top-down-berättelse. Varje funktion ska följas av de på nästa abstraktionsnivå så vi sjunker en nivå i taget när vi läser. Detta skapar en naturlig flöde i koden.

**Use Descriptive Names (s. 39-40)**
Var inte rädd för långa namn. Ett långt beskrivande namn är bättre än ett kort gåtfullt namn eller en lång beskrivande kommentar. Spendera tid på att välja namn - det förtydligar ofta designen och kan leda till förbättringar.

**Function Arguments (s. 40-43)**
Idealiskt antal argument är noll (niladic). Sedan kommer ett (monadic), följt av två (dyadic). Tre argument (triadic) bör undvikas där det är möjligt. Mer än tre (polyadic) kräver mycket speciell motivering. Argument är svåra - de tar konceptuell kraft. Flag-argument (boolean) är särskilt dåliga eftersom de proklamerar att funktionen gör mer än en sak.

**Command Query Separation (s. 45-46)**
Funktioner ska antingen göra något eller svara på något, men inte båda. Antingen ska funktionen ändra tillståndet för ett objekt (command), eller returnera information om objektet (query). Att göra båda leder ofta till förvirring.

**Prefer Exceptions to Returning Error Codes (s. 46-47)**
Att returnera felkoder från kommandefunktioner tvingar anroparen att hantera felet omedelbart, vilket leder till djupt nästlade strukturer. Använd exceptions istället - det separerar felhantering från normal logik och gör koden renare.

**Don't Repeat Yourself (DRY) (s. 48-49)**
Duplicering kan vara roten till allt ont i programvara. Många principer och praxis har skapats för att kontrollera eller eliminera duplicering. Kod som upprepas skapar underhållsproblem eftersom ändringar måste göras på flera ställen.

**How Do You Write Functions Like This? (s. 49)**
Ingen skriver perfekta funktioner från början. Första utkastet är klumpigt och oorganiserat. Sedan masserar och förfinar man koden - bryter ut funktioner, ändrar namn, eliminerar duplicering - tills koden läser som den ska.

**Min reflektion:**
Detta kapitel har visat mig flera konkreta problem i min egen kod. Vissa av mina funktioner är för långa och gör flera saker. Jag blandar abstraktionsnivåer genom att ha hög-nivå logik tillsammans med låg-nivå detaljer i samma funktion. Jag använder ibland return codes istället för exceptions, vilket leder till rörig felhantering. Det finns också duplicerad validering som borde extraheras. Det viktigaste jag tar med mig är att små funktioner inte bara är lättare att förstå - de är också lättare att testa och återanvända. Att kontinuerligt refaktorera för att hålla funktioner små och fokuserade är en nödvändig disciplin.

---

## 5. Reflektion över egen kodkvalitet

Efter att ha analyserat min habit tracker-modul mot Clean Code-principerna ser jag både styrkor och tydliga förbättringsområden. Modulen består av tre huvudklasser: `HabitManager`, `Habit` och `StreakCalculator` med totalt 188 rader kod.

### Styrkor i min kod

**Konsekvent namngivning (Kapitel 2)**
Jag följer konsekventa verb-substantiv mönster: `createHabit`, `addCompletion`, `removeCompletion`, `getCurrentStreak`. Boolean-metoder använder korrekt "is"-prefix som `isStreakBroken`. Detta följer Clean Code:s "Pick One Word per Concept" - jag använder genomgående "add/remove" för modifierande operationer och "get" för queries.

**Små, fokuserade funktioner (Kapitel 3)**
De flesta av mina publika metoder är små och gör en sak:

- `getHabit()`: 1 rad - perfekt delegation
- `getAllHabits()`: 1 rad - enkel transformation
- `getCurrentStreak()`: 5 rader - ren delegation till StreakCalculator

**Bra separation of concerns**
`HabitManager` hanterar habit-management, `Habit` hanterar individuell habit-logik, och `StreakCalculator` hanterar komplex streak-beräkning. Detta följer Single Responsibility Principle väl.

**Konsekvent användning av exceptions**
Istället för att returnera error codes använder jag exceptions med beskrivande meddelanden: `'Habit ID must be a non-empty string.'` och `'Habit with ID ${habitId} not found.'`

### Identifierade svagheter

**1. Blandade abstraktionsnivåer i `getCurrentStreak` (StreakCalculator)**

```javascript
static getCurrentStreak(completions, allowMissedDays = false, maxMissed  (!completions || completions.length === 0) {
    return 0
  }

  // Låg-nivå datummanipulation
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Komplex loop-logik på mellanivå
  while (true) {
    if (this._hasCompletionOnDate(completions, currentDate)) {
      currentStreak++
```

_Problem:_ Enligt "One Level of Abstraction per Function" (s. 36-37) blandas olika abstraktionsnivåer i samma funktion.

**2. För lång funktion: `getCurrentStreak` (40 rader)**
Denna funktion bryter mot "Small"-principen (s. 34-35). Den hanterar validering, datuminitialisering, loop-logik och säkerhetsbrytning i samma funktion.

_Förbättring:_ Extrahera till separata funktioner:

- `_validateCompletions(completions)`
- `_initializeDateTracking(today)`
- `_calculateStreakFromDate(completions, startDate, allowMissedDays, maxMissedDays)`

**3. Tvetydig return-logik i `deleteHabit`**

```javascript
deleteHabit(habitId) {
  return (!this.habits.delete(habitId))
}
```

_Problem:_ Returnerar `true` när deletion MISSLYCKADES och `false` när den LYCKADES - motsatsen till vad man förväntar sig. Detta bryter mot "Use Intention-Revealing Names".

_Förbättring:_ Antingen `return this.habits.delete(habitId)` eller byt namn till `failedToDeleteHabit()`.

**4. Inkonsekvent felhantering mellan `addCompletion` och resten**
`addCompletion` i `Habit`-klassen returnerar `false` för duplicering medan andra metoder kastar exceptions. Detta bryter mot "Command Query Separation" (s. 45-46).

```javascript
// Habit.addCompletion returnerar boolean
if (this.hasCompletionOnDate(completionDate)) {
  return false
}

// Men andra metoder kastar exceptions
throw new Error('Habit ID must be a non-empty string.')
```

**5. Magiska nummer och hårdkodade värden**

```javascript
if (currentStreak > 365) {
  break
}
```

_Problem:_ "365" är ett magiskt nummer utan förklaring.
_Förbättring:_ `const MAX_REASONABLE_STREAK = 365` med kommentar om varför.

**6. Bristande valideringskonsekvens**
`_getHabitOrThrow()` validerar både habitId och existens, men denna validering dupliceras delvis i andra metoder. Detta bryter mot DRY-principen (s. 48).

### Konkreta förbättringsförslag

**Omedelbart:**

1. Fixa `deleteHabit` return-logiken
2. Extrahera magiska nummer till konstanter
3. Gör `addCompletion` konsekvent med exceptions istället för boolean returns

**Strukturella förbättringar:**

1. Dela upp `getCurrentStreak` i mindre funktioner enligt abstraktionsnivåer
2. Skapa centraliserad validering för habitId
3. Extrahera datumhantering till `DateUtils`-klass

### Positiva lärdomar från Clean Code

**"Do One Thing" har varit kraftfullt** - mina bästa funktioner som `getHabit()` och `getAllHabits()` gör exakt en sak och är lätta att förstå och testa.

**Delegation fungerar utmärkt** - `HabitManager` delegerar streak-beräkningar till `StreakCalculator`, vilket håller ansvar separerade och gör testing enklare.

**Beskrivande namn eliminerar kommentarer** - funktioner som `hasCompletionOnDate()` och `isStreakBroken()` är självförklarande.

### Självbedömning mot Clean Code

- **Namngivning (Kap 2):** 8/10 - Konsekvent och beskrivande på hög nivå, men några interna variabler kunde förbättras
- **Funktioner (Kap 3):** 6/10 - Många små bra funktioner, men `getCurrentStreak` bryter flera principer
- **Övergripande struktur:** 7/10 - Bra separation of concerns men vissa inkonsekvenset

### Slutsats

Min kod visar att jag förstår och tillämpar många Clean Code-principer, särskilt kring namngivning och små funktioner. De största problemen ligger i funktioner som vuxit för stora och inkonsekvent felhantering. Viktigast är att jag nu har verktygen att identifiera och åtgärda dessa problem systematiskt. Clean Code handlar om kontinuerlig förbättring, inte perfekt kod från start.

---

## Sammanfattande reflektion

God namngivning och välstrukturerade funktioner arbetar tillsammans för läsbar kod. När funktioner är små blir namnen naturligt beskrivande. Båda handlar om rätt abstraktionsnivå.

Martin betonar: kod som fungerar är ofta dåligt strukturerad. Vi måste kontinuerligt förbättra genom refaktorering. Clean Code är en resa, inte en destination.
