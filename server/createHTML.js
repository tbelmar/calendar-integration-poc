/**
 * HTML created here:
 *    https://litmus.com/builder/24b1815
 * And here:
 *    https://www.litmus.com/blog/how-to-create-an-add-to-calendar-link-for-your-emails/
 *
 *
 */

export const createHTML = ({
  googleLink,
  outlookLink,
  icalLink,
  inviteTitle,
  inviteText,
  inviteMonth,
  inviteDayOfMonth,
}) => `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
<!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
<!-- QUESTIONS? TWEET US @LITMUSAPP -->
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--Help character display properly.-->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--Set the initial scale of the email.-->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--Force Outlook clients to render with a better MS engine.-->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <!--Help prevent blue links and autolinking-->
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <!--prevent Apple from reformatting and zooming messages.-->
  <meta name="x-apple-disable-message-reformatting">

  <!--target dark mode-->
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark only">
    <!--[if (gte mso 9)|(IE)]><!-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <!--<![endif]-->


  <!-- Allow for better image rendering on Windows hi-DPI displays. -->
  <!--[if mso]>
<noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
</noscript>
<![endif]-->

  <!--to support dark mode meta tags-->
  <style type="text/css">
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
  </style>

  <!--webfont code goes here-->
  <!--[if (gte mso 9)|(IE)]><!-->
  <!--webfont <link /> goes here-->
  <style>
    h1, h2, h3, h4, h5, p, a, span, img, ul, ol, li {
      font-family: 'Open Sans', Helvetica, Arial, sans-serif !important;
    }
  </style>
  <!--<![endif]-->

  <style type="text/css">
    body {
      height: 100% !important;
      margin: 0 auto !important;
      padding: 0 !important;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
        word-spacing: normal;
    }

    div[style*="margin:16px 0"] {
      margin: 0 !important;
    }

    table,
    td {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      display: block;
    }

    p,
    h1,
    h2,
    h3 {
      padding: 0;
      margin: 0;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    u+#body a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }

    .link:hover {
      text-decoration: none !important;
    }

    .fadeimg {
      transition: 0.3s !important;
      opacity: 1 !important;
    }

    .fadeimg:hover {
      transition: 0.3s !important;
      opacity: 0.5 !important;
    }

    /* start CTA HOVER EFFECTS */
    .cta { transition: 0.3s !important; box-shadow:0 3px 6px rgba(0,0,0,.2); }
    .cta span{ transition: 0.3s !important; }
    .cta:hover { transition: 0.3s !important; box-shadow: none !important; }
    .cta:hover span { transition: 0.3s !important; color: #262524 !important; }
    .cta-border:hover { border-bottom: 3px solid transparent !important; }
    .btn-red:hover { background-color: #F78F7D !important; }
    .btn-blue:hover { background-color: #B5CFE3 !important; }
    .btn-green:hover { background-color: #8BD09C !important; }
    .btn-purple:hover { background-color: #D7C3DA !important; }
    .btn-teal:hover { background-color: #6EAFA7 !important; }
    .btn-orange:hover { background-color: #F7B288 !important; }
    .btn-yellow:hover { background-color: #FBECBC !important; }
    .btn-tangerine:hover { background-color: #FACE8F !important; }
    /* end CTA HOVER EFFECTS */

    .mobile {
      display: none;
    }


  </style>

  <!--mobile styles-->
  <style>
    @media screen and (max-width:600px) {
        .wMobile { width: 95% !important; }
        .wInner {  width: 90% !important; }
        .wFull { width: 100% !important; }
        .desktop { width: 0 !important; display: none !important; }
        .mobile { display: block !important; }
        .bgImg { background-size: 100% 100% !important; }
    }
  </style>

    <!--default styles-->
    <style>
        .gmail-show { display: none !important; }
        .outlook-show { display: none !important; }
        .yahoo-show { display: none !important; }
        .default-hide { display: none !important; mso-hide: all; }
        .default-line { display: none !important; mso-hide: all; }
    </style>

    <!--gmail styles-->
    <style>
        u + .body .gmail-show { display: inline-block !important; }
        u + .body .gmail-hide { display: none !important; }
        u + .body .default { display: none !important; }
        u + .body .default-hide { display: inline-block !important; }
        u + .body .default-line { display: inline-block !important; }
    </style>

    <!--owa styles-->
    <style>
    [class~="x_outlook-show"] { display: inline-block !important; }
    [class~="x_outlook-hide"] { display: none !important; }
    [class~="x_default"] { display: none !important; }
    [class~="x_default-hide"] { display: inline-block !important; }
    </style>

    <!--yahoo styles-->
    <style>
    .& .yahoo-show { display: inline-block !important }
    .& .yahoo-hide { display: none !important }
    .& .default { display: none !important }
    .& .default-hide { display: inline-block !important }
    .& .default-line { display: inline-block !important; }
    </style>

  <!--dark mode styles-->
  <!--these are just example classes that can be used.-->
  <style>
    @media (prefers-color-scheme: dark) {

      /* Shows Dark Mode-Only Content, Like Images */
      .dark-img {
        display: block !important;
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        max-width: inherit !important;
        line-height: auto !important;
        margin-top: 0px !important;
        visibility: inherit !important;
      }

      /* Hides Light Mode-Only Content, Like Images */
      .light-img {
        display: none;
        display: none !important;
      }

      /* Custom Dark Mode Background Color */
      .darkmode {
        background-color: #272623 !important;
      }
      .darkmode2 {
        background-color: #1c1c1c !important;
      }

        .callout { background-color: #fdfdfd !important; }
        .darkcopy { color: #444444 !important; }

      /* Custom Dark Mode Font Colors */
      h1, h2, p, span, a, b {
        color: #fdfdfd !important;
      }


      /* Custom Dark Mode Text Link Color */
      .link { color: #91ADD4 !important; }
      .darkmode2 a { color: #fdfdfd !important; }

      .cta-border { color: #7EABCE !important; border-bottom: 3px solid #7EABCE !important; }
      .cta-border span { color: #7EABCE !important; }
      .btn-orange span, .btn-yellow span, .btn-tangerine span { color: initial !important; }
    }

    /* Copy dark mode styles for android support */
    /* Shows Dark Mode-Only Content, Like Images */
    [data-ogsc] .dark-img {
      display: block !important;
      width: auto !important;
      overflow: visible !important;
      float: none !important;
      max-height: inherit !important;
      max-width: inherit !important;
      line-height: auto !important;
      margin-top: 0px !important;
      visibility: inherit !important;
    }

    /* Hides Light Mode-Only Content, Like Images */
    [data-ogsc] .light-img {
      display: none;
      display: none !important;
    }

    /* Custom Dark Mode Background Color */
    [data-ogsc] .darkmode {
      background-color: #272623 !important;
    }
    [data-ogsc] .darkmode2 {
      background-color: #1c1c1c !important;
    }

      [data-ogsc] .callout { background-color: #fdfdfd !important; }
    /* Custom Dark Mode Font Colors */
    [data-ogsc] h1, [data-ogsc] h2, [data-ogsc] p, [data-ogsc] span, [data-ogsc] a, [data-ogsc] b {
      color: #fdfdfd !important;
    }

    /* Custom Dark Mode Text Link Color */
    [data-ogsc] .link { color: #91ADD4 !important; }

    [data-ogsc] .darkmode2 a { color: #fdfdfd !important; }


    [data-ogsc] .cta-border { color: #7EABCE !important; border-bottom: 3px solid #7EABCE !important; }
    [data-ogsc] .cta-border span { color: #7EABCE !important; }
    [data-ogsc] .btn-orange span, [data-ogsc] .btn-yellow span, [data-ogsc] .btn-tangerine span { color: initial !important; }
  </style>

  <!--correct superscripts in Outlook-->
  <!--[if (gte mso 9)|(IE)]>
        <style>
          sup{font-size:100% !important;}
        </style>
        <![endif]-->
  <title></title>

</head>

<body id="body" class="darkmode body" bgcolor="#ffffff" style="background-color:#ffffff;">
  <!--hidden preheader with preh-header spacer hack-->
  <div class="litmus-builder-preview-text" style="display:none;">
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
<div role="article" aria-roledescription="email" aria-label="email name" lang="en">
  <!--start of email-->
  <table class="darkmode" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:100%;">

      <!--header-->
      <tr>
          <td align="center" valign="top">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td class="bgImg" background="https://litmus-builder.s3.amazonaws.com/c868262f-2128-4d32-93f7-153cb522e0c4" bgcolor="#3b4a69" valign="top" style="background-image: url('https://litmus-builder.s3.amazonaws.com/c868262f-2128-4d32-93f7-153cb522e0c4'); background-size: 100% 620px; width: 100%; height: auto;">
                  <div>
                      <!--[if (gte mso 9)|(IE)]>
                        <center>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;">
                        <tr>
                        <td>
                        <![endif]-->
                      <table class="wInner" align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 0; font-family: Helvetica, Arial, sans-serif;">
                        <h1 style="font-size: 40px; color: #ffffff;">${inviteTitle}</h1>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top" style="padding: 35px 0; font-family: Helvetica, Arial, sans-serif;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:200px;">
                        <tr>
                        <td align="left" valign="top">
                        <![endif]-->
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="80%" style="max-width: 200px;">
                          <tr>
                              <td align="center" bgcolor="red" style="padding: 10px; border-radius: 3px 3px 0 0;">
                                  <p style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 14px;">
                                     <strong>${inviteMonth}</strong>
                                  </p>
                              </td>
                          </tr>
                          <tr>
                              <td class="callout" align="center" bgcolor="#ffffff" style=" padding: 15px; border-radius: 0 0 3px 3px;">
                                 <p class="darkcopy" style="color: #444444; font-family: Helvetica, Arial, sans-serif; font-size: 48px;">
                                     ${inviteDayOfMonth}
                                  </p>
                              </td>
                          </tr>
                      </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                    </td>
                </tr>
                <tr>
                    <td align="left" valign="top" style=" padding-top: 0;">
                        <p style="font-family: Helvetica, Arial, sans-serif; color: #fdfdfd; font-size: 20px; line-height: 26px; margin: 0;">
                        ${inviteText}
                        </p>

                    </td>
                </tr>
                          <tr>
                              <td align="center" valign="top" style="padding-top: 35px;">
                                  <!--default-->
                                 <a class="default" href="${icalLink}" class="cta btn-yellow" style="background-color: #F4D66C; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight:bold; text-decoration: none; padding: 14px 20px; color: #1D2025; border-radius: 5px; display:inline-block; mso-padding-alt:0; box-shadow:0 3px 6px rgba(0,0,0,.2);"><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:30pt">&nbsp;</i><![endif]--><span style="mso-text-raise:15pt;">Add to your Calendar</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a>

                                  <!--[if (gte mso 9)|(IE)]><!-->
                                  <a class="gmail-show" href="${googleLink}" class="cta btn-yellow" style="background-color: #F4D66C; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight:bold; text-decoration: none; padding: 14px 20px; color: #1D2025; border-radius: 5px; display:inline-block; mso-padding-alt:0; box-shadow:0 3px 6px rgba(0,0,0,.2);"><span style="mso-text-raise:15pt;">Add to your Google Calendar</span></a>

                                  <a class="outlook-show" href="${outlookLink}" class="cta btn-yellow" style="background-color: #F4D66C; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight:bold; text-decoration: none; padding: 14px 20px; color: #1D2025; border-radius: 5px; display:inline-block; mso-padding-alt:0; box-shadow:0 3px 6px rgba(0,0,0,.2);"><span style="mso-text-raise:15pt;">Add to your Outlook Calendar</span></a>
                                  <!--<![endif]-->
                              </td>
                          </tr>
                          <tr>
                              <td align="center" valign="top" style="padding-bottom: 40px;">
                                  <p style="font-family: Helvetica, Arial, sans-serif; color: #fdfdfd; font-size: 18px; line-height: 24px; margin: 20px 0 0 0;">
                                      <span class="default-hide"><a href="${icalLink}" target="_blank" style="color: #fdfdfd; text-decoration: underline;">iCal file</a></span><span class="default-line">&nbsp;|&nbsp;</span><span class="outlook-hide"><a href="${outlookLink}" target="_blank" style="color: #fdfdfd; text-decoration: underline;">Outlook.com</a> </span><span class="gmail-hide">&nbsp;|&nbsp;<a href="${googleLink}" target="_blank" style="color: #fdfdfd; text-decoration: underline;">Google</a></span></p>
                              </td>
                          </tr>

            </table>
                      <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    </center>
                    <![endif]-->
                  </div>
                </td>
              </tr>
            </table>
          </td>
      </tr>

      <!--footer-->
      <tr>
  <td align="center" class="darkmode2" style="padding: 0px 15px; background-color: #E1E6E9;">
    <table role="presentation" class="wMobile" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px;">
      <tr>
        <td align="center" style="padding: 60px 0 0;">
        </td>
      </tr>
    </table>
  </td>
</tr>
  </table>
</div>

    <!--analytics-->
</body>

</html>`;
