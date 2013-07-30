#Form-saver

**What**

A simple script that saves the content of a form in the session storage as you write and re-apply all the content on page reload.
Works only with inputs at the moment.

**Using it**

```html
<form id="form">
    <label for="nome">Nome</label>
    <input type="text" name="nome"></input>
    <br />
    <label for="cognome">Cognome</label>
    <input type="text" name="cognome"></input>
</form>
```

```javascript
// Create a saver and pass the form selector
var saver = formSaver("#form");
// Fill the form with previous data
saver.fill();
// Start tracking and saving
saver.autoSave();
// Be notified on saves
saver.onSave(function(data) {
    console.log("Saved! " + data + " at " + new Date());
});
```

**Requirements**
 * My PubSub module (https://github.com/ricca509/pubsub)
 * jQuery


If you have any questions or feedback, feel free to contact me using [@CoppolaRiccardo](https://twitter.com/CoppolaRiccardo) on Twitter.
