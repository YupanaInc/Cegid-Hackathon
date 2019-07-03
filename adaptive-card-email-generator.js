const {adaptiveCardListenerEndpoint} = require('./config.js');

const templatePartOne =`<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <script type="application/adaptivecard+json">
    {
      "type": "AdaptiveCard",
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "version": "1.0",
      "padding": "none",
      "body": [
          {
              "type": "Container",
              "style": "accent",
              "items": [
                  {
                      "type": "ColumnSet",
                      "columns": [
                          {
                              "type": "Column",
                              "width": "stretch",
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "text": "**Documents liés à votre relevé bancaire**",
                                      "size": "Large",
                                      "weight": "Bolder"
                                  }
                              ],
                              "style": null,
                              "backgroundImage": null,
                              "bleed": false
                          }
                      ],
                      "style": null,
                      "bleed": false
                  }
              ],
              "backgroundImage": null,
              "bleed": false
          },
          {
              "type": "Container",
              "style": "emphasis",
              "spacing": "Large",
              "items": [
                  {
                      "type": "ColumnSet",
                      "columns": [
                            {
                                "type": "Column",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "weight": "Bolder",
                                        "text": "Date"
                                    }
                                ],
                                "width": "auto",
                                "style": null,
                                "backgroundImage": null,
                                "bleed": false
                            },
                          {
                              "type": "Column",
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "weight": "Bolder",
                                      "text": "Description"
                                  }
                              ],
                              "width": "stretch",
                              "style": null,
                              "backgroundImage": null,
                              "bleed": false
                          },
                          {
                              "type": "Column",
                              "spacing": "Large",
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "weight": "Bolder",
                                      "text": "Montant"
                                  }
                              ],
                              "width": "auto",
                              "style": null,
                              "backgroundImage": null,
                              "bleed": false
                          }
                      ],
                      "style": null,
                      "bleed": false
                  }
              ],
              "backgroundImage": null,
              "bleed": false
          },`;

function generateEmailWithAdaptiveCard(emailList) {
    const emailWithAdaptiveCard = emailList.reduce((generatedEmail, email, index) => {
        return generatedEmail + generateEntry(email, index);
    }, templatePartOne) + generateTemplatePartTwo(emailList);

    return emailWithAdaptiveCard;
}


function generateEntry(email, index) {
    return `{
              "type": "ColumnSet",
              "padding": {
                  "left": "padding",
                  "right": "padding"
              },
              "columns": [
                    {
                        "type": "Column",
                        "items": [
                            {
                                "type": "TextBlock",
                                "horizontalAlignment": "Left",
                                "text": "${(new Date(email.date)).toLocaleDateString('fr-fr')}",
                                "wrap": true
                            }
                        ],
                        "width": "auto",
                        "style": null,
                        "backgroundImage": null,
                        "bleed": false
                    },
                  {
                      "type": "Column",
                      "items": [
                          {
                              "type": "TextBlock",
                              "horizontalAlignment": "Left",
                              "text": "${email.label}",
                              "wrap": true
                          }
                      ],
                      "width": "stretch",
                      "style": null,
                      "backgroundImage": null,
                      "bleed": false
                  },
                  {
                      "type": "Column",
                      "horizontalAlignment": "Left",
                      "spacing": "Medium",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "€${email.amount}",
                              "wrap": true
                          }
                      ],
                      "width": "auto",
                      "style": null,
                      "backgroundImage": null,
                      "bleed": false
                  },
                  {
                      "type": "Column",
                      "spacing": "Small",
                      "verticalContentAlignment": "top",
                      "id": "chevronDown1",
                      "items": [
                          {
                              "type": "Input.Toggle",
                              "id": "transaction${index}",
                              "title": "",
                              "value": "true",
                              "valueOn": "true",
                              "valueOff": "false",
                              "validation": null,
                              "wrap": false
                          }
                      ],
                      "width": "auto",
                      "style": null,
                      "backgroundImage": null,
                      "bleed": false
                  }
              ],
              "style": null,
              "bleed": false
          },`;
}

function generateTemplatePartTwo(emailList) {
    return `
      ],
      "style": null,
      "backgroundImage": null,
      "bleed": false,
      "actions": [
          {
            "type": "Action.Http",
            "title": "Validate",
            "method": "POST",
            "url": "${adaptiveCardListenerEndpoint}",
            "body": "${generateActionBody(emailList)}",
            "headers": [
              { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
            ]
          }
        ]
  }
  </script>
</head>
<body>
    SweepDoc by Cegid - Catégorise et traite les documents dans vos mails
</body>
</html>`;
}

function generateActionBody(emailList) {
    return emailList.reduce((actionBody, email, index) => {
        return `${actionBody}${encodeURIComponent(email.emailId)}={{transaction${index+1}.value}}&`;
    }, '');
    
}

exports.generateEmailWithAdaptiveCard = generateEmailWithAdaptiveCard;
