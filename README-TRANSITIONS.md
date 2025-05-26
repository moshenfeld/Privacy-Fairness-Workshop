# Workshop Year Transition Guide

This guide explains how to transition the workshop website between different phases and years.

## File Structure

```
/
├── index.html                          # Main page (dynamic content)
├── components/
│   ├── workshop-config.js              # Main configuration file
│   └── schedules/
│       ├── 2025-schedule.html          # Reusable 2025 schedule component
│       └── 2026-schedule.html          # Future schedule component
├── 2025/
│   ├── index.html                      # 2025 dedicated page
│   └── schedule.csv                    # 2025 schedule data (CSV format)
├── 2026/
│   ├── call-for-talks.html             # 2026 call for talks component
│   └── index.html                      # Future 2026 dedicated page
└── past.html                           # Past workshops archive
```

## Transition Process

### Phase 1: Call for Talks (Start of Workshop Cycle)

**To switch to call-for-talks mode:**

1. Edit `components/workshop-config.js`:
   ```javascript
   currentYear: 2026,
   currentPhase: 'call-for-talks',
   ```

2. Update workshop details in the config:
   ```javascript
   2026: {
       date: 'Thursday, June XX, 2026',  // Update actual date
       location: 'University Name',      // Update location
       registrationUrl: 'https://...',   // Add registration form
       scheduleDataPath: null            // No schedule yet
   }
   ```

3. Update `2026/call-for-talks.html` with:
   - Submission deadlines
   - Contact information
   - Submission guidelines

### Phase 2: Schedule Available (After Program Committee Decisions)

**To switch to schedule mode:**

1. Create the schedule data:
   - Create `2026/schedule.csv` with the workshop program
   - Copy and modify `components/schedules/2025-schedule.html` to `2026-schedule.html`

2. Edit `components/workshop-config.js`:
   ```javascript
   currentPhase: 'schedule',
   components: {
       'schedule': 'components/schedules/2026-schedule.html'
   },
   workshops: {
       2026: {
           // ...other details...
           scheduleDataPath: '2026/schedule.csv'
       }
   }
   ```

3. Create `2026/index.html` (copy from `2025/index.html` and update paths)

### Phase 3: After Workshop (Archive Previous Year)

1. Move 2025 to past workshops:
   - Update `past.html` to include 2025 workshop
   - Update navigation links

2. Prepare for next year:
   - Create `2027/` directory
   - Create new call-for-talks component

## Key Benefits

✅ **Easy Transitions**: Change 2 lines in config file to switch phases  
✅ **No Code Duplication**: Shared schedule component  
✅ **CSV Editing**: Non-technical users can edit schedule.csv  
✅ **Future-Proof**: Clear process for adding new years  
✅ **Consistent Design**: All phases use same styling  

## Example Transition Commands

**Start of 2026 workshop cycle:**
```javascript
// In components/workshop-config.js
currentYear: 2026,
currentPhase: 'call-for-talks',
```

**When schedule is ready:**
```javascript
// In components/workshop-config.js
currentPhase: 'schedule',
```

**After workshop concludes:**
```javascript
// In components/workshop-config.js
currentYear: 2027,
currentPhase: 'call-for-talks',
```

## Schedule CSV Format

The schedule.csv file should follow this format:
```csv
start_time,end_time,speaker,title,abstract,bio,expandable
9:30,10:00,Registration,,,,FALSE
10:00,10:10,Speaker Name,Talk Title,"Abstract text","Speaker bio",TRUE
```

- Use quotes around fields containing commas
- Set `expandable=TRUE` for talks with abstracts/bios
- Leave abstract/bio empty for TBD talks
