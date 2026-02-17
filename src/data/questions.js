<<<<<<< HEAD
import { mswordQuestions } from './mswordQuestions';
import { powerpointQuestions } from './powerpointQuestions';
import { excelQuestions } from './excelQuestions';

export const questionsData = {
  msword: mswordQuestions,
  powerpoint: powerpointQuestions,
  excel: excelQuestions,
};
=======
export const questionsData = {
  msword: {
    easy: [
      {
        id: 1,
        question: "What is the default file extension for Microsoft Word documents?",
        options: [".txt", ".docx", ".pdf", ".doc"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Which keyboard shortcut is used to save a document in MS Word?",
        options: ["Ctrl+N", "Ctrl+S", "Ctrl+O", "Ctrl+P"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 3,
        question: "What is the name of the bar at the top of MS Word that contains tabs like Home, Insert, and Review?",
        options: ["Toolbar", "Menu Bar", "Ribbon", "Status Bar"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 4,
        question: "Which tool in MS Word is used to check spelling and grammar?",
        options: ["Find & Replace", "Spell Check", "Thesaurus", "Review"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 5,
        question: "What does Ctrl+Z do in MS Word?",
        options: ["Save", "Copy", "Paste", "Undo"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 6,
        question: "Which view in MS Word shows how the document will look when printed?",
        options: ["Draft View", "Web Layout", "Print Layout", "Outline View"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 7,
        question: "What is the purpose of the 'Find and Replace' feature in MS Word?",
        options: ["To save documents", "To format text", "To print documents", "To search and replace text"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 8,
        question: "Which button is used to make text bold in MS Word?",
        options: ["I", "U", "A", "B"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 9,
        question: "What does Ctrl+C do in MS Word?",
        options: ["Cut", "Paste", "Copy", "Close"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 10,
        question: "Which tab contains options for inserting tables, pictures, and shapes?",
        options: ["Home", "Page Layout", "Insert", "References"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 11,
        question: "What is the default font size in MS Word?",
        options: ["10pt", "11pt", "14pt", "12pt"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 12,
        question: "Which feature allows you to see two parts of the same document simultaneously?",
        options: ["New Window", "Arrange All", "Split View", "Compare"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 13,
        question: "What does Ctrl+V do in MS Word?",
        options: ["Cut", "Copy", "View", "Paste"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 14,
        question: "Which alignment option centers text between the left and right margins?",
        options: ["Left", "Right", "Justify", "Center"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 15,
        question: "What is the purpose of headers and footers in MS Word?",
        options: ["To format text", "To save space", "To print faster", "To add page numbers and titles"],
        correctAnswer: 3,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "Which feature in MS Word allows you to create a table of contents automatically?",
        options: ["Styles", "Headings", "References", "All of the above"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "What is the difference between 'Save' and 'Save As' in MS Word?",
        options: ["No difference", "Save As is faster", "Save is for new documents only", "Save overwrites, Save As creates new file"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 18,
        question: "Which feature allows you to track changes made by multiple users?",
        options: ["Comments", "Review", "Version History", "Track Changes"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 19,
        question: "What is the purpose of styles in MS Word?",
        options: ["To save documents", "To print documents", "To check spelling", "To format text consistently"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "Which feature allows you to insert automatic page numbers?",
        options: ["Footer", "Header", "Page Number", "All of the above"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "What is the purpose of the 'Mail Merge' feature in MS Word?",
        options: ["To send emails", "To format text", "To save documents", "To create personalized documents"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "Which view shows the document structure with headings and subheadings?",
        options: ["Print Layout", "Draft", "Web Layout", "Outline"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 23,
        question: "What is the purpose of section breaks in MS Word?",
        options: ["To save the document", "To print faster", "To check spelling", "To change formatting for different parts"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "Which feature allows you to insert mathematical equations?",
        options: ["Symbols", "Formulas", "Math", "Equations"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 25,
        question: "What is the purpose of the 'Navigation Pane' in MS Word?",
        options: ["To save documents", "To format text", "To print documents", "To navigate through document sections"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 26,
        question: "Which feature allows you to protect a document with a password?",
        options: ["Save As", "Security", "Permissions", "Protect Document"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 27,
        question: "What is the purpose of 'Quick Parts' in MS Word?",
        options: ["To save time", "To format text", "To check spelling", "To insert reusable content"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "Which feature allows you to compare two documents?",
        options: ["Review", "Merge", "Track Changes", "Compare"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 29,
        question: "What is the purpose of 'Watermarks' in MS Word?",
        options: ["To save space", "To format text", "To print faster", "To add background text or images"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 30,
        question: "Which feature allows you to create a bibliography automatically?",
        options: ["Citations", "References", "Bibliography", "All of the above"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "What is the purpose of 'Macros' in MS Word?",
        options: ["To save documents", "To format text", "To check spelling", "To automate repetitive tasks"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 32,
        question: "Which feature allows you to create custom keyboard shortcuts?",
        options: ["Options", "Shortcuts", "Keyboard", "Customize"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "What is the purpose of 'Field Codes' in MS Word?",
        options: ["To save space", "To format text", "To print faster", "To insert dynamic content"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 34,
        question: "Which feature allows you to create a master document with subdocuments?",
        options: ["Master Document", "Outline", "Subdocument", "All of the above"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 35,
        question: "What is the purpose of 'Cross-references' in MS Word?",
        options: ["To save documents", "To format text", "To check spelling", "To link to other parts of the document"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 36,
        question: "Which feature allows you to create a table of figures automatically?",
        options: ["References", "Table of Figures", "Captions", "All of the above"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 37,
        question: "What is the purpose of 'Document Properties' in MS Word?",
        options: ["To save space", "To format text", "To print faster", "To store metadata about the document"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 38,
        question: "Which feature allows you to create a table of authorities?",
        options: ["Citations", "References", "Table of Authorities", "All of the above"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 39,
        question: "What is the purpose of 'Content Controls' in MS Word?",
        options: ["To save documents", "To format text", "To check spelling", "To create interactive forms"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 40,
        question: "Which feature allows you to create a table of contents with custom formatting?",
        options: ["References", "Custom TOC", "Table of Contents", "All of the above"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 41,
        question: "What is the purpose of 'Building Blocks' in MS Word?",
        options: ["To save space", "To format text", "To print faster", "To create reusable content"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 42,
        question: "Which feature allows you to create a table of contents with page numbers?",
        options: ["Table of Contents", "References", "Page Numbers", "All of the above"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 43,
        question: "What is the purpose of 'Document Inspector' in MS Word?",
        options: ["To save documents", "To format text", "To check spelling", "To remove hidden data"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 44,
        question: "Which feature allows you to create a table of contents with hyperlinks?",
        options: ["References", "Hyperlinks", "Table of Contents", "All of the above"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 45,
        question: "What is the purpose of 'Template' in MS Word?",
        options: ["To save space", "To format text", "To print faster", "To create documents with predefined formatting"],
        correctAnswer: 3,
        points: 20
      }
    ]
  },
  powerpoint: {
    easy: [
      {
        id: 1,
        question: "What is the default file extension for PowerPoint presentations?",
        options: [".ppt", ".pptx", ".ppsx", ".potx"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Which keyboard shortcut is used to start a slideshow in PowerPoint?",
        options: ["F5", "Ctrl+S", "Ctrl+P", "F1"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 3,
        question: "What is the name of the area where you can add speaker notes in PowerPoint?",
        options: ["Notes Pane", "Slide Pane", "Outline Pane", "Task Pane"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 4,
        question: "Which view shows all slides as thumbnails in PowerPoint?",
        options: ["Normal View", "Slide Sorter", "Reading View", "Notes Page"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 5,
        question: "What does Ctrl+M do in PowerPoint?",
        options: ["Save", "Copy", "New Slide", "Paste"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 6,
        question: "Which tab contains options for inserting charts and tables?",
        options: ["Home", "Insert", "Design", "Transitions"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 7,
        question: "What is the purpose of slide layouts in PowerPoint?",
        options: ["To save space", "To format slides consistently", "To print faster", "To check spelling"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 8,
        question: "Which feature allows you to add animations to objects?",
        options: ["Transitions", "Animations", "Effects", "Motion"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 9,
        question: "What does Ctrl+D do in PowerPoint?",
        options: ["Delete", "Duplicate", "Design", "Draw"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 10,
        question: "Which view is best for editing slide content?",
        options: ["Slide Sorter", "Normal View", "Reading View", "Notes Page"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 11,
        question: "What is the default slide size in PowerPoint?",
        options: ["16:9", "4:3", "16:10", "Letter"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 12,
        question: "Which feature allows you to hide slides during presentation?",
        options: ["Hide Slide", "Skip Slide", "Remove Slide", "Delete Slide"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 13,
        question: "What does Ctrl+Shift+D do in PowerPoint?",
        options: ["Delete", "Duplicate", "Design", "Draw"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 14,
        question: "Which tab contains themes and background styles?",
        options: ["Home", "Insert", "Design", "Review"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 15,
        question: "What is the purpose of slide transitions in PowerPoint?",
        options: ["To save presentations", "To animate between slides", "To format text", "To check spelling"],
        correctAnswer: 1,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "What is the purpose of slide masters in PowerPoint?",
        options: ["To save space", "To control the overall design", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "Which feature allows you to create custom slide layouts?",
        options: ["Slide Master", "Layout Master", "Custom Layout", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 18,
        question: "What is the purpose of action buttons in PowerPoint?",
        options: ["To save space", "To create interactive navigation", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 19,
        question: "Which feature allows you to rehearse timings for automatic slideshow?",
        options: ["Rehearse Timings", "Set Up Slide Show", "Record Slide Show", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "What is the purpose of hyperlinks in PowerPoint?",
        options: ["To save space", "To link to other slides or websites", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "Which feature allows you to embed videos in slides?",
        options: ["Insert Video", "Media", "Multimedia", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "What is the purpose of slide sections in PowerPoint?",
        options: ["To save space", "To organize slides into groups", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 23,
        question: "Which feature allows you to create a photo album presentation?",
        options: ["Photo Album", "Picture Album", "Image Gallery", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "What is the purpose of presenter view in PowerPoint?",
        options: ["To save space", "To show speaker notes during presentation", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 25,
        question: "Which feature allows you to create custom shows?",
        options: ["Custom Shows", "Slide Shows", "Presentations", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 26,
        question: "What is the purpose of slide zoom in PowerPoint?",
        options: ["To save space", "To navigate quickly between slides", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 27,
        question: "Which feature allows you to record narration for slides?",
        options: ["Record Slide Show", "Narration", "Audio Recording", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "What is the purpose of slide handouts in PowerPoint?",
        options: ["To save space", "To provide audience with slide copies", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 29,
        question: "Which feature allows you to create interactive quizzes?",
        options: ["Forms", "Quizzes", "Interactive Content", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 30,
        question: "What is the purpose of slide comments in PowerPoint?",
        options: ["To save space", "To add feedback and collaboration", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "What is the purpose of VBA macros in PowerPoint?",
        options: ["To save space", "To automate repetitive tasks", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 32,
        question: "Which feature allows you to create custom animation paths?",
        options: ["Motion Paths", "Custom Paths", "Animation Paths", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "What is the purpose of slide timing in PowerPoint?",
        options: ["To save space", "To control automatic slide advancement", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 34,
        question: "Which feature allows you to create trigger animations?",
        options: ["Triggers", "Animation Triggers", "Custom Triggers", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 35,
        question: "What is the purpose of slide masters with multiple layouts?",
        options: ["To save space", "To create consistent design across slides", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 36,
        question: "Which feature allows you to create morph transitions?",
        options: ["Morph", "Smooth Transitions", "Advanced Transitions", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 37,
        question: "What is the purpose of slide show settings in PowerPoint?",
        options: ["To save space", "To configure presentation options", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 38,
        question: "Which feature allows you to create 3D models in slides?",
        options: ["3D Models", "3D Objects", "3D Graphics", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 39,
        question: "What is the purpose of slide protection in PowerPoint?",
        options: ["To save space", "To prevent unauthorized editing", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 40,
        question: "Which feature allows you to create ink annotations?",
        options: ["Ink", "Pen Tools", "Drawing Tools", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 41,
        question: "What is the purpose of slide templates in PowerPoint?",
        options: ["To save space", "To create consistent presentations", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 42,
        question: "Which feature allows you to create interactive buttons?",
        options: ["Action Buttons", "Interactive Buttons", "Custom Buttons", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 43,
        question: "What is the purpose of slide show recording in PowerPoint?",
        options: ["To save space", "To record presentations with narration", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 44,
        question: "Which feature allows you to create custom slide sizes?",
        options: ["Custom Slide Size", "Slide Dimensions", "Page Setup", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 45,
        question: "What is the purpose of slide show broadcasting in PowerPoint?",
        options: ["To save space", "To present slides online to remote audiences", "To format text", "To print faster"],
        correctAnswer: 1,
        points: 20
      }
    ]
  },
  excel: {
    easy: [
      {
        id: 1,
        question: "What is the default file extension for Excel workbooks?",
        options: [".xls", ".xlsx", ".csv", ".xltx"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Which keyboard shortcut is used to save a workbook in Excel?",
        options: ["Ctrl+S", "Ctrl+N", "Ctrl+O", "Ctrl+P"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 3,
        question: "What is the intersection of a row and column called in Excel?",
        options: ["Cell", "Box", "Square", "Field"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 4,
        question: "Which function is used to add numbers in Excel?",
        options: ["ADD", "SUM", "TOTAL", "PLUS"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 5,
        question: "What does Ctrl+C do in Excel?",
        options: ["Cut", "Copy", "Paste", "Close"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 6,
        question: "Which tab contains options for inserting charts and tables?",
        options: ["Home", "Insert", "Data", "Review"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 7,
        question: "What is the purpose of cell formatting in Excel?",
        options: ["To save space", "To change appearance of cells", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 8,
        question: "Which feature allows you to freeze panes in Excel?",
        options: ["Freeze Panes", "Lock Panes", "Stick Panes", "Hold Panes"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 9,
        question: "What does Ctrl+V do in Excel?",
        options: ["Cut", "Copy", "Paste", "View"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 10,
        question: "Which view shows how the worksheet will look when printed?",
        options: ["Normal View", "Page Layout", "Page Break Preview", "Custom View"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 11,
        question: "What is the default number format in Excel?",
        options: ["Text", "Number", "General", "Currency"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 12,
        question: "Which feature allows you to sort data in Excel?",
        options: ["Sort", "Arrange", "Order", "Organize"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 13,
        question: "What does Ctrl+Z do in Excel?",
        options: ["Save", "Copy", "Undo", "Paste"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 14,
        question: "Which feature allows you to filter data in Excel?",
        options: ["Filter", "Screen", "Hide", "Show"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 15,
        question: "What is the purpose of cell references in Excel?",
        options: ["To save space", "To identify cell locations", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "What is the purpose of formulas in Excel?",
        options: ["To save workbooks", "To perform calculations", "To format cells", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "Which function is used to find the average of numbers?",
        options: ["AVERAGE", "MEAN", "TOTAL", "SUM"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 18,
        question: "What is the purpose of conditional formatting in Excel?",
        options: ["To save space", "To format cells based on conditions", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 19,
        question: "Which feature allows you to create charts from data?",
        options: ["Charts", "Graphs", "Visualizations", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "What is the purpose of data validation in Excel?",
        options: ["To save space", "To control data entry", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "Which function is used to count cells with numbers?",
        options: ["COUNT", "COUNTA", "COUNTIF", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "What is the purpose of named ranges in Excel?",
        options: ["To save space", "To assign names to cell ranges", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 23,
        question: "Which feature allows you to protect worksheets?",
        options: ["Protect Sheet", "Lock Sheet", "Secure Sheet", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "What is the purpose of data tables in Excel?",
        options: ["To save space", "To perform what-if analysis", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 25,
        question: "Which function is used to find the maximum value?",
        options: ["MAX", "HIGHEST", "TOP", "PEAK"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 26,
        question: "What is the purpose of goal seek in Excel?",
        options: ["To save space", "To find input values for desired results", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 27,
        question: "Which feature allows you to consolidate data from multiple sheets?",
        options: ["Consolidate", "Combine", "Merge", "All of the above"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "What is the purpose of scenarios in Excel?",
        options: ["To save space", "To model different situations", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 29,
        question: "Which function is used to find the minimum value?",
        options: ["MIN", "LOWEST", "BOTTOM", "BASE"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 30,
        question: "What is the purpose of data analysis tools in Excel?",
        options: ["To save space", "To perform statistical analysis", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "What is the purpose of pivot tables in Excel?",
        options: ["To save space", "To analyze and summarize data", "To format cells", "To print faster"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 32,
        question: "Which feature allows you to create macros in Excel?",
        options: ["Macros", "VBA", "Automation", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "What is the purpose of array formulas in Excel?",
        options: ["To save space", "To perform calculations on multiple values", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 34,
        question: "Which function is used to look up values in tables?",
        options: ["VLOOKUP", "HLOOKUP", "LOOKUP", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 35,
        question: "What is the purpose of solver in Excel?",
        options: ["To save space", "To find optimal solutions", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 36,
        question: "Which feature allows you to create custom functions?",
        options: ["VBA Functions", "User Defined Functions", "Custom Functions", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 37,
        question: "What is the purpose of data models in Excel?",
        options: ["To save space", "To create relationships between tables", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 38,
        question: "Which function is used to perform complex calculations?",
        options: ["IF", "SUMIF", "COUNTIF", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 39,
        question: "What is the purpose of power query in Excel?",
        options: ["To save space", "To import and transform data", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 40,
        question: "Which feature allows you to create interactive dashboards?",
        options: ["Dashboards", "Controls", "Interactive Elements", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 41,
        question: "What is the purpose of power pivot in Excel?",
        options: ["To save space", "To create advanced data models", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 42,
        question: "Which function is used to perform financial calculations?",
        options: ["PV", "FV", "PMT", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 43,
        question: "What is the purpose of data mining in Excel?",
        options: ["To save space", "To discover patterns in data", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 44,
        question: "Which feature allows you to create advanced charts?",
        options: ["Advanced Charts", "Complex Charts", "Specialized Charts", "All of the above"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 45,
        question: "What is the purpose of power bi integration in Excel?",
        options: ["To save space", "To create business intelligence reports", "To delete data", "To check spelling"],
        correctAnswer: 1,
        points: 20
      }
    ]
  },
  msword_filipino: {
    easy: [
      {
        id: 1,
        question: "Ano ang default na file extension para sa mga dokumento ng Microsoft Word?",
        options: [".txt", ".docx", ".pdf", ".doc"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Aling keyboard shortcut ang ginagamit para mag-save ng dokumento sa MS Word?",
        options: ["Ctrl+N", "Ctrl+S", "Ctrl+O", "Ctrl+P"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 3,
        question: "Ano ang tawag sa bar sa taas ng MS Word na naglalaman ng mga tabs tulad ng Home, Insert, at Review?",
        options: ["Toolbar", "Menu Bar", "Ribbon", "Status Bar"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 4,
        question: "Aling tool sa MS Word ang ginagamit para mag-check ng spelling at grammar?",
        options: ["Find & Replace", "Spell Check", "Thesaurus", "Review"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 5,
        question: "Ano ang ginagawa ng Ctrl+Z sa MS Word?",
        options: ["Save", "Copy", "Paste", "Undo"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 6,
        question: "Aling view sa MS Word ang nagpapakita kung paano magmumukha ang dokumento kapag na-print?",
        options: ["Draft View", "Web Layout", "Print Layout", "Outline View"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 7,
        question: "Ano ang layunin ng 'Find and Replace' feature sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-print ng mga dokumento", "Para maghanap at magpalit ng text"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 8,
        question: "Aling button ang ginagamit para gawing bold ang text sa MS Word?",
        options: ["I", "U", "A", "B"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 9,
        question: "Ano ang ginagawa ng Ctrl+C sa MS Word?",
        options: ["Cut", "Paste", "Copy", "Close"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 10,
        question: "Aling tab ang naglalaman ng mga opsyon para mag-insert ng tables, pictures, at shapes?",
        options: ["Home", "Page Layout", "Insert", "References"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 11,
        question: "Ano ang default na font size sa MS Word?",
        options: ["10pt", "11pt", "14pt", "12pt"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 12,
        question: "Aling feature ang nagbibigay-daan na makita ang dalawang bahagi ng parehong dokumento nang sabay?",
        options: ["New Window", "Arrange All", "Split View", "Compare"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 13,
        question: "Ano ang ginagawa ng Ctrl+V sa MS Word?",
        options: ["Cut", "Copy", "View", "Paste"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 14,
        question: "Aling alignment option ang nagce-center ng text sa pagitan ng left at right margins?",
        options: ["Left", "Right", "Justify", "Center"],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 15,
        question: "Ano ang layunin ng headers at footers sa MS Word?",
        options: ["Para mag-format ng text", "Para mag-save ng space", "Para mag-print nang mas mabilis", "Para magdagdag ng page numbers at titles"],
        correctAnswer: 3,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "Aling feature sa MS Word ang nagbibigay-daan na gumawa ng table of contents nang awtomatiko?",
        options: ["Styles", "Headings", "References", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "Ano ang pagkakaiba ng 'Save' at 'Save As' sa MS Word?",
        options: ["Walang pagkakaiba", "Mas mabilis ang Save As", "Para lang sa mga bagong dokumento ang Save", "Nag-o-overwrite ang Save, gumagawa ng bagong file ang Save As"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 18,
        question: "Aling feature ang nagbibigay-daan na mag-track ng mga pagbabago na ginawa ng maraming user?",
        options: ["Comments", "Review", "Version History", "Track Changes"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 19,
        question: "Ano ang layunin ng styles sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-print ng mga dokumento", "Para mag-check ng spelling", "Para mag-format ng text nang pare-pareho"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "Aling feature ang nagbibigay-daan na mag-insert ng awtomatikong page numbers?",
        options: ["Footer", "Header", "Page Number", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "Ano ang layunin ng 'Mail Merge' feature sa MS Word?",
        options: ["Para mag-send ng emails", "Para mag-format ng text", "Para mag-save ng mga dokumento", "Para gumawa ng mga personalized na dokumento"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "Aling view ang nagpapakita ng istruktura ng dokumento na may headings at subheadings?",
        options: ["Print Layout", "Draft", "Web Layout", "Outline"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 23,
        question: "Ano ang layunin ng section breaks sa MS Word?",
        options: ["Para mag-save ng dokumento", "Para mag-print nang mas mabilis", "Para mag-check ng spelling", "Para magbago ng formatting para sa iba't ibang bahagi"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "Aling feature ang nagbibigay-daan na mag-insert ng mathematical equations?",
        options: ["Symbols", "Formulas", "Math", "Equations"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 25,
        question: "Ano ang layunin ng 'Navigation Pane' sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-print ng mga dokumento", "Para mag-navigate sa mga bahagi ng dokumento"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 26,
        question: "Aling feature ang nagbibigay-daan na mag-protect ng dokumento gamit ang password?",
        options: ["Save As", "Security", "Permissions", "Protect Document"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 27,
        question: "Ano ang layunin ng 'Quick Parts' sa MS Word?",
        options: ["Para mag-save ng oras", "Para mag-format ng text", "Para mag-check ng spelling", "Para mag-insert ng reusable content"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "Aling feature ang nagbibigay-daan na mag-compare ng dalawang dokumento?",
        options: ["Review", "Merge", "Track Changes", "Compare"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 29,
        question: "Ano ang layunin ng 'Watermarks' sa MS Word?",
        options: ["Para mag-save ng space", "Para mag-format ng text", "Para mag-print nang mas mabilis", "Para magdagdag ng background text o images"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 30,
        question: "Aling feature ang nagbibigay-daan na gumawa ng bibliography nang awtomatiko?",
        options: ["Citations", "References", "Bibliography", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "Ano ang layunin ng 'Macros' sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-check ng spelling", "Para mag-automate ng mga paulit-ulit na gawain"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 32,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom keyboard shortcuts?",
        options: ["Options", "Shortcuts", "Keyboard", "Customize"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "Ano ang layunin ng 'Field Codes' sa MS Word?",
        options: ["Para mag-save ng space", "Para mag-format ng text", "Para mag-print nang mas mabilis", "Para mag-insert ng dynamic content"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 34,
        question: "Aling feature ang nagbibigay-daan na gumawa ng master document na may subdocuments?",
        options: ["Master Document", "Outline", "Subdocument", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 35,
        question: "Ano ang layunin ng 'Cross-references' sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-check ng spelling", "Para mag-link sa ibang bahagi ng dokumento"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 36,
        question: "Aling feature ang nagbibigay-daan na gumawa ng table of figures nang awtomatiko?",
        options: ["References", "Table of Figures", "Captions", "Lahat ng nabanggit"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 37,
        question: "Ano ang layunin ng 'Document Properties' sa MS Word?",
        options: ["Para mag-save ng space", "Para mag-format ng text", "Para mag-print nang mas mabilis", "Para mag-store ng metadata tungkol sa dokumento"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 38,
        question: "Aling feature ang nagbibigay-daan na gumawa ng table of authorities?",
        options: ["Citations", "References", "Table of Authorities", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 39,
        question: "Ano ang layunin ng 'Content Controls' sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-check ng spelling", "Para gumawa ng interactive forms"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 40,
        question: "Aling feature ang nagbibigay-daan na gumawa ng table of contents na may custom formatting?",
        options: ["References", "Custom TOC", "Table of Contents", "Lahat ng nabanggit"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 41,
        question: "Ano ang layunin ng 'Building Blocks' sa MS Word?",
        options: ["Para mag-save ng space", "Para mag-format ng text", "Para mag-print nang mas mabilis", "Para gumawa ng reusable content"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 42,
        question: "Aling feature ang nagbibigay-daan na gumawa ng table of contents na may page numbers?",
        options: ["Table of Contents", "References", "Page Numbers", "Lahat ng nabanggit"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 43,
        question: "Ano ang layunin ng 'Document Inspector' sa MS Word?",
        options: ["Para mag-save ng mga dokumento", "Para mag-format ng text", "Para mag-check ng spelling", "Para mag-remove ng hidden data"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 44,
        question: "Aling feature ang nagbibigay-daan na gumawa ng table of contents na may hyperlinks?",
        options: ["References", "Hyperlinks", "Table of Contents", "Lahat ng nabanggit"],
        correctAnswer: 2,
        points: 20
      },
      {
        id: 45,
        question: "Ano ang layunin ng 'Template' sa MS Word?",
        options: ["Para mag-save ng space", "Para mag-format ng text", "Para mag-print nang mas mabilis", "Para gumawa ng mga dokumento na may predefined formatting"],
        correctAnswer: 3,
        points: 20
      }
    ]
  },
  powerpoint_filipino: {
    easy: [
      {
        id: 1,
        question: "Ano ang default na file extension para sa mga presentation ng PowerPoint?",
        options: [".ppt", ".pptx", ".ppsx", ".potx"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Aling keyboard shortcut ang ginagamit para magsimula ng slideshow sa PowerPoint?",
        options: ["F5", "Ctrl+S", "Ctrl+P", "F1"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 3,
        question: "Ano ang tawag sa lugar kung saan maaari kang magdagdag ng speaker notes sa PowerPoint?",
        options: ["Notes Pane", "Slide Pane", "Outline Pane", "Task Pane"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 4,
        question: "Aling view ang nagpapakita ng lahat ng slides bilang thumbnails sa PowerPoint?",
        options: ["Normal View", "Slide Sorter", "Reading View", "Notes Page"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 5,
        question: "Ano ang ginagawa ng Ctrl+M sa PowerPoint?",
        options: ["Save", "Copy", "New Slide", "Paste"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 6,
        question: "Aling tab ang naglalaman ng mga opsyon para mag-insert ng charts at tables?",
        options: ["Home", "Insert", "Design", "Transitions"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 7,
        question: "Ano ang layunin ng slide layouts sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-format ng slides nang pare-pareho", "Para mag-print nang mas mabilis", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 8,
        question: "Aling feature ang nagbibigay-daan na magdagdag ng animations sa mga objects?",
        options: ["Transitions", "Animations", "Effects", "Motion"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 9,
        question: "Ano ang ginagawa ng Ctrl+D sa PowerPoint?",
        options: ["Delete", "Duplicate", "Design", "Draw"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 10,
        question: "Aling view ang pinakamahusay para sa pag-edit ng slide content?",
        options: ["Slide Sorter", "Normal View", "Reading View", "Notes Page"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 11,
        question: "Ano ang default na slide size sa PowerPoint?",
        options: ["16:9", "4:3", "16:10", "Letter"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 12,
        question: "Aling feature ang nagbibigay-daan na mag-hide ng slides habang nagpe-present?",
        options: ["Hide Slide", "Skip Slide", "Remove Slide", "Delete Slide"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 13,
        question: "Ano ang ginagawa ng Ctrl+Shift+D sa PowerPoint?",
        options: ["Delete", "Duplicate", "Design", "Draw"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 14,
        question: "Aling tab ang naglalaman ng themes at background styles?",
        options: ["Home", "Insert", "Design", "Review"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 15,
        question: "Ano ang layunin ng slide transitions sa PowerPoint?",
        options: ["Para mag-save ng mga presentation", "Para mag-animate sa pagitan ng slides", "Para mag-format ng text", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "Ano ang layunin ng slide masters sa PowerPoint?",
        options: ["Para mag-save ng space", "Para kontrolin ang overall design", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom slide layouts?",
        options: ["Slide Master", "Layout Master", "Custom Layout", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 18,
        question: "Ano ang layunin ng action buttons sa PowerPoint?",
        options: ["Para mag-save ng space", "Para gumawa ng interactive navigation", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 19,
        question: "Aling feature ang nagbibigay-daan na mag-rehearse ng timings para sa awtomatikong slideshow?",
        options: ["Rehearse Timings", "Set Up Slide Show", "Record Slide Show", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "Ano ang layunin ng hyperlinks sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-link sa ibang slides o websites", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "Aling feature ang nagbibigay-daan na mag-embed ng videos sa slides?",
        options: ["Insert Video", "Media", "Multimedia", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "Ano ang layunin ng slide sections sa PowerPoint?",
        options: ["Para mag-save ng space", "Para i-organize ang mga slides sa mga grupo", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 23,
        question: "Aling feature ang nagbibigay-daan na gumawa ng photo album presentation?",
        options: ["Photo Album", "Picture Album", "Image Gallery", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "Ano ang layunin ng presenter view sa PowerPoint?",
        options: ["Para mag-save ng space", "Para magpakita ng speaker notes habang nagpe-present", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 25,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom shows?",
        options: ["Custom Shows", "Slide Shows", "Presentations", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 26,
        question: "Ano ang layunin ng slide zoom sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-navigate nang mabilis sa pagitan ng slides", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 27,
        question: "Aling feature ang nagbibigay-daan na mag-record ng narration para sa slides?",
        options: ["Record Slide Show", "Narration", "Audio Recording", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "Ano ang layunin ng slide handouts sa PowerPoint?",
        options: ["Para mag-save ng space", "Para magbigay sa audience ng mga kopya ng slides", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 29,
        question: "Aling feature ang nagbibigay-daan na gumawa ng interactive quizzes?",
        options: ["Forms", "Quizzes", "Interactive Content", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 30,
        question: "Ano ang layunin ng slide comments sa PowerPoint?",
        options: ["Para mag-save ng space", "Para magdagdag ng feedback at collaboration", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "Ano ang layunin ng VBA macros sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-automate ng mga paulit-ulit na gawain", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 32,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom animation paths?",
        options: ["Motion Paths", "Custom Paths", "Animation Paths", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "Ano ang layunin ng slide timing sa PowerPoint?",
        options: ["Para mag-save ng space", "Para kontrolin ang awtomatikong pag-usad ng slide", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 34,
        question: "Aling feature ang nagbibigay-daan na gumawa ng trigger animations?",
        options: ["Triggers", "Animation Triggers", "Custom Triggers", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 35,
        question: "Ano ang layunin ng slide masters na may multiple layouts?",
        options: ["Para mag-save ng space", "Para gumawa ng consistent design sa buong slides", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 36,
        question: "Aling feature ang nagbibigay-daan na gumawa ng morph transitions?",
        options: ["Morph", "Smooth Transitions", "Advanced Transitions", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 37,
        question: "Ano ang layunin ng slide show settings sa PowerPoint?",
        options: ["Para mag-save ng space", "Para i-configure ang mga opsyon ng presentation", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 38,
        question: "Aling feature ang nagbibigay-daan na gumawa ng 3D models sa slides?",
        options: ["3D Models", "3D Objects", "3D Graphics", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 39,
        question: "Ano ang layunin ng slide protection sa PowerPoint?",
        options: ["Para mag-save ng space", "Para maiwasan ang unauthorized editing", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 40,
        question: "Aling feature ang nagbibigay-daan na gumawa ng ink annotations?",
        options: ["Ink", "Pen Tools", "Drawing Tools", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 41,
        question: "Ano ang layunin ng slide templates sa PowerPoint?",
        options: ["Para mag-save ng space", "Para gumawa ng consistent presentations", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 42,
        question: "Aling feature ang nagbibigay-daan na gumawa ng interactive buttons?",
        options: ["Action Buttons", "Interactive Buttons", "Custom Buttons", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 43,
        question: "Ano ang layunin ng slide show recording sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-record ng presentations na may narration", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 44,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom slide sizes?",
        options: ["Custom Slide Size", "Slide Dimensions", "Page Setup", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 45,
        question: "Ano ang layunin ng slide show broadcasting sa PowerPoint?",
        options: ["Para mag-save ng space", "Para mag-present ng slides online sa remote audiences", "Para mag-format ng text", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      }
    ]
  },
  excel_filipino: {
    easy: [
      {
        id: 1,
        question: "Ano ang default na file extension para sa mga workbook ng Excel?",
        options: [".xls", ".xlsx", ".csv", ".xltx"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 2,
        question: "Aling keyboard shortcut ang ginagamit para mag-save ng workbook sa Excel?",
        options: ["Ctrl+S", "Ctrl+N", "Ctrl+O", "Ctrl+P"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 3,
        question: "Ano ang tawag sa intersection ng row at column sa Excel?",
        options: ["Cell", "Box", "Square", "Field"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 4,
        question: "Aling function ang ginagamit para magdagdag ng mga numero sa Excel?",
        options: ["ADD", "SUM", "TOTAL", "PLUS"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 5,
        question: "Ano ang ginagawa ng Ctrl+C sa Excel?",
        options: ["Cut", "Copy", "Paste", "Close"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 6,
        question: "Aling tab ang naglalaman ng mga opsyon para mag-insert ng charts at tables?",
        options: ["Home", "Insert", "Data", "Review"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 7,
        question: "Ano ang layunin ng cell formatting sa Excel?",
        options: ["Para mag-save ng space", "Para magbago ng appearance ng mga cells", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 8,
        question: "Aling feature ang nagbibigay-daan na mag-freeze ng panes sa Excel?",
        options: ["Freeze Panes", "Lock Panes", "Stick Panes", "Hold Panes"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 9,
        question: "Ano ang ginagawa ng Ctrl+V sa Excel?",
        options: ["Cut", "Copy", "Paste", "View"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 10,
        question: "Aling view ang nagpapakita kung paano magmumukha ang worksheet kapag na-print?",
        options: ["Normal View", "Page Layout", "Page Break Preview", "Custom View"],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 11,
        question: "Ano ang default na number format sa Excel?",
        options: ["Text", "Number", "General", "Currency"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 12,
        question: "Aling feature ang nagbibigay-daan na mag-sort ng data sa Excel?",
        options: ["Sort", "Arrange", "Order", "Organize"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 13,
        question: "Ano ang ginagawa ng Ctrl+Z sa Excel?",
        options: ["Save", "Copy", "Undo", "Paste"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 14,
        question: "Aling feature ang nagbibigay-daan na mag-filter ng data sa Excel?",
        options: ["Filter", "Screen", "Hide", "Show"],
        correctAnswer: 0,
        points: 10
      },
      {
        id: 15,
        question: "Ano ang layunin ng cell references sa Excel?",
        options: ["Para mag-save ng space", "Para makilala ang mga lokasyon ng cells", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 10
      }
    ],
    medium: [
      {
        id: 16,
        question: "Ano ang layunin ng formulas sa Excel?",
        options: ["Para mag-save ng mga workbook", "Para magsagawa ng mga kalkulasyon", "Para mag-format ng mga cells", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 17,
        question: "Aling function ang ginagamit para mahanap ang average ng mga numero?",
        options: ["AVERAGE", "MEAN", "TOTAL", "SUM"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 18,
        question: "Ano ang layunin ng conditional formatting sa Excel?",
        options: ["Para mag-save ng space", "Para mag-format ng mga cells batay sa mga kondisyon", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 19,
        question: "Aling feature ang nagbibigay-daan na gumawa ng charts mula sa data?",
        options: ["Charts", "Graphs", "Visualizations", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 20,
        question: "Ano ang layunin ng data validation sa Excel?",
        options: ["Para mag-save ng space", "Para kontrolin ang data entry", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 21,
        question: "Aling function ang ginagamit para mag-count ng mga cells na may mga numero?",
        options: ["COUNT", "COUNTA", "COUNTIF", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 22,
        question: "Ano ang layunin ng named ranges sa Excel?",
        options: ["Para mag-save ng space", "Para mag-assign ng mga pangalan sa cell ranges", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 23,
        question: "Aling feature ang nagbibigay-daan na mag-protect ng mga worksheets?",
        options: ["Protect Sheet", "Lock Sheet", "Secure Sheet", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 24,
        question: "Ano ang layunin ng data tables sa Excel?",
        options: ["Para mag-save ng space", "Para magsagawa ng what-if analysis", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 25,
        question: "Aling function ang ginagamit para mahanap ang maximum value?",
        options: ["MAX", "HIGHEST", "TOP", "PEAK"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 26,
        question: "Ano ang layunin ng goal seek sa Excel?",
        options: ["Para mag-save ng space", "Para mahanap ang mga input values para sa nais na mga resulta", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 27,
        question: "Aling feature ang nagbibigay-daan na mag-consolidate ng data mula sa maraming sheets?",
        options: ["Consolidate", "Combine", "Merge", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 15
      },
      {
        id: 28,
        question: "Ano ang layunin ng scenarios sa Excel?",
        options: ["Para mag-save ng space", "Para mag-model ng iba't ibang mga sitwasyon", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      },
      {
        id: 29,
        question: "Aling function ang ginagamit para mahanap ang minimum value?",
        options: ["MIN", "LOWEST", "BOTTOM", "BASE"],
        correctAnswer: 0,
        points: 15
      },
      {
        id: 30,
        question: "Ano ang layunin ng data analysis tools sa Excel?",
        options: ["Para mag-save ng space", "Para magsagawa ng statistical analysis", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 15
      }
    ],
    hard: [
      {
        id: 31,
        question: "Ano ang layunin ng pivot tables sa Excel?",
        options: ["Para mag-save ng space", "Para mag-analyze at mag-summarize ng data", "Para mag-format ng mga cells", "Para mag-print nang mas mabilis"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 32,
        question: "Aling feature ang nagbibigay-daan na gumawa ng macros sa Excel?",
        options: ["Macros", "VBA", "Automation", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 33,
        question: "Ano ang layunin ng array formulas sa Excel?",
        options: ["Para mag-save ng space", "Para magsagawa ng mga kalkulasyon sa maraming mga halaga", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 34,
        question: "Aling function ang ginagamit para mag-lookup ng mga halaga sa mga table?",
        options: ["VLOOKUP", "HLOOKUP", "LOOKUP", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 35,
        question: "Ano ang layunin ng solver sa Excel?",
        options: ["Para mag-save ng space", "Para mahanap ang mga optimal na solusyon", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 36,
        question: "Aling feature ang nagbibigay-daan na gumawa ng custom functions?",
        options: ["VBA Functions", "User Defined Functions", "Custom Functions", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 37,
        question: "Ano ang layunin ng data models sa Excel?",
        options: ["Para mag-save ng space", "Para gumawa ng mga relasyon sa pagitan ng mga table", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 38,
        question: "Aling function ang ginagamit para magsagawa ng mga kumplikadong kalkulasyon?",
        options: ["IF", "SUMIF", "COUNTIF", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 39,
        question: "Ano ang layunin ng power query sa Excel?",
        options: ["Para mag-save ng space", "Para mag-import at mag-transform ng data", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 40,
        question: "Aling feature ang nagbibigay-daan na gumawa ng interactive dashboards?",
        options: ["Dashboards", "Controls", "Interactive Elements", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 41,
        question: "Ano ang layunin ng power pivot sa Excel?",
        options: ["Para mag-save ng space", "Para gumawa ng advanced data models", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 42,
        question: "Aling function ang ginagamit para magsagawa ng mga financial calculations?",
        options: ["PV", "FV", "PMT", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 43,
        question: "Ano ang layunin ng data mining sa Excel?",
        options: ["Para mag-save ng space", "Para matuklasan ang mga pattern sa data", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      },
      {
        id: 44,
        question: "Aling feature ang nagbibigay-daan na gumawa ng advanced charts?",
        options: ["Advanced Charts", "Complex Charts", "Specialized Charts", "Lahat ng nabanggit"],
        correctAnswer: 3,
        points: 20
      },
      {
        id: 45,
        question: "Ano ang layunin ng power bi integration sa Excel?",
        options: ["Para mag-save ng space", "Para gumawa ng business intelligence reports", "Para mag-delete ng data", "Para mag-check ng spelling"],
        correctAnswer: 1,
        points: 20
      }
    ]
  }
};

>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
