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

| Metodnamn | Rader | Argument | Reflektion och regler från Clean Code |
|-----------|-------|----------|----------------------------------------|
| `addCompletion(habitName, date)` | 12 | 2 | **Small (s. 34-35)**: OK storlek. **Dyadic (s. 42)**: Acceptabelt. **Do One Thing (s. 35-36)**: Validering kunde extraheras. |
| `calculateStreak(completionDates)` | 28 | 1 | **Small (s. 34-35)**: För lång. **Monadic (s. 41)**: Bra form. **Abstraction (s. 36-37)**: Blandar nivåer - bör delas upp. |
| `getHabits()` | 3 | 0 | **Small (s. 34-35)**: Perfekt. **Niladic (s. 40-41)**: Idealiskt. **Command Query (s. 45-46)**: Perfekt query. |
| `removeHabit(habitName)` | 8 | 1 | **Small (s. 34-35)**: Bra. **Monadic (s. 41)**: Korrekt. **No Side Effects (s. 44-45)**: Gör vad namnet säger. |
| `isCompletedOn(habitName, date)` | 15 | 2 | **Small (s. 34-35)**: OK. **Dyadic (s. 42)**: Nödvändigt. **Command Query (s. 45-46)**: Korrekt query. |

### Reflektion
Majoriteten är små och fokuserade. `calculateStreak` är för lång och blandar abstraktionsnivåer. Duplicerad validering bör extraheras enligt DRY (s. 48).