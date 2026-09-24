SAI INTERIOR DESIGN — UPDATED WEBSITE

Included:
- index.html — complete responsive website
- admin-login.html — admin/project management information page
- Code.gs — Google Apps Script backend for enquiry submissions
- assets/ — 17 extracted visuals from Document 1(4).pdf:
  - project-01-1.png = logo
  - project-02-1.png through project-17-1.png = 16 unique portfolio images


GOOGLE SHEETS SETUP:
1. Create/open a Google Sheet.
2. Extensions -> Apps Script.
3. Paste Code.gs.
4. Run setup() once and allow permissions.
5. Deploy -> New deployment -> Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Copy the /exec URL.
9. In index.html, replace SCRIPT_URL with your deployed /exec URL.
10. Open the website and submit a test enquiry. It should create a row in the Enquiries sheet.

The current index.html keeps the Apps Script URL supplied in the existing website package. If that deployment belongs to an older Apps Script project, use the new /exec URL generated from Code.gs.

PDF BASIS:
The 16 project visuals are extracted from pages 2–17 of the supplied Document 1(4).pdf; page 1 is used as the logo. The portfolio labels follow the supplied PDF text.
