export const taskReminderTemplate = ( { title, why , link} : any) => {
`<div style="font-family: Arial">
    <h2>⏰ Task Reminder</h2>
    <p><strong>${title}</strong></p>
    <p>${why}</p>
    ${link ? `<a href="${link}">Open Link</a>` : ""}
    <br/>
    <small>Please complete your task.</small>
  </div>`
}