---
layout: post
title:  Examples of aria-hidden="true" and role="presentation" in the wild
date:   2018-04-03
categories: accessibility
---

I recently ran into a scenario at work where I wasn't sure whether to use `aria-hidden="true"` or `role="presentation"`.
When I turned to the internet for answers, I found some [good articles](#good-resources) about how and why to use them, but they didn't apply
to my use-case, and I came away still feeling pretty hazy about how to distinguish them. Everything I read started with official specs (TODO: link) or documentation (TODO: link) and broke them down into more human-readable language,
with a few simple code samples.

This post is an attempt to go at my question in the opposite direction. I'm essentially asking, how are `aria-hidden="true"` and `role="presentation"`
used by engineers who work on popular, accessible web sites and applications, and what does that tell me about the purpose of these attributes? Below you'll
find screenshots and code samples from sites like Amazon, Facebook, Twitter, (list all).

## What aria-hidden="true" is used for:

### 1. Content that is visually hidden, but still exists in the DOM, like:

[explanation about performance]

#### [cdc.gov] Content for hidden panels - https://cl.ly/391C1I0u2Q0R https://www.cdc.gov/healthyyouth/about/index.htm
  <figure>
    <img />
    <figcaption>[facebook.com]</figcaption>
  </figure>

 Code:
  ```html
    <div></div>
    ```

#### [canada.ca] Non-expanded Dropdown menus https://cl.ly/2e3H1H1P3u1Y https://www.canada.ca/en/services/benefits/family.html
#### [facebook.com] Tooltips that aren't displayed tooltip's that will be shown https://cl.ly/3n3W2v2I2v1L
#### [facebook.com] Inactive slides on a carousel slider  https://cl.ly/3s03251a453q
#### [amazon.com] Buttons that are hidden until you hover over them https://cl.ly/1i0f0s0g0j1Q
#### [amazon.com] The wrapper for a loading spinner https://cl.ly/3I132P3O0k03
#### [amazon.com] Hidden carousel cards- https://cl.ly/1G3G3I051F3U
#### [google.com] Popup menus that are not selected https://cl.ly/0w0i0e2G3h3s - https://cl.ly/1J0o3M0l0b2f  M

### 2. Content that requires visual cues to understand, and for which you've provided a better alternative for screenreaders, like:

[explanation]

#### [twitter.com] Terse button text https://cl.ly/2u0i1V032z04
#### [linkedin.com] Common action buttons that need context https://cl.ly/3u051743262C https://cl.ly/3c033G1Q0U10 https://cl.ly/3k2i290a473m https://cl.ly/432r3h46251m
#### [amazon.com] A countdown timer  https://cl.ly/0B0V0Q1E0m1Y

3. Icons, icons, icons
  - Icons galore - https://cl.ly/1y1f2v0t3C0u
  - Icons, that have text for a11y https://cl.ly/1J1z3p1A3O03
  - More icons: https://www.visionaustralia.org/services/how-we-help
  - A dark right-facing caret separating links https://cl.ly/0V3K0t3N0w1Z

4. Unicode characters used to separate links
  - middot https://cl.ly/2U091n1g1I2a
  - bullet separator between Languages in language box on right sidebar https://cl.ly/16303n0s3z3R

7. Advertis-y stuff
  - Ad image banner: https://cl.ly/3p2q1n0u3341 https://cl.ly/003j2y0j1V1R
  - Images that contain text: https://cl.ly/3W1h2a041l0P

8. Redundant content
  - link containing post's user image (also has tabindex="-1") https://cl.ly/3M2h1824263U
  - hiding links that are nice for sighted users, but there are better links. The user profile link that is the cover photo - https://cl.ly/1w2R3C3H3Y0O

9. Hiding elements you're doing administrative or tricksy non-user-helpful stuff with
  - form element (label) used to add style to an icon- https://cl.ly/431j2c0v1R2p
  - very different content between mobile and desktop site. They use it to generate hooks in the DOM for later use.  https://cl.ly/3Q1D3U2x3b2j
  - Iframe contained in a pixel presumably for ad tracking or something: https://cl.ly/2m1W41172t1m
    - noscript tag, has an html string with an iframe that allows them to track google analytics https://cl.ly/2k1j1B2S1X3N

## Examples of role="presentation"

1. Images that indicate a quick loading state
  - Loading spinner https://cl.ly/3I132P3O0k03
  - Loading stripe: https://cl.ly/1x0f1Q0H2G01

2. Elements that help with layout that don't matter to non-sighted users
  - tables user in the People You May Know section. obcsure: https://cl.ly/260k3c2l3y16
  - footer div that uses display: table https://cl.ly/462B0V3Y0u2p
  - Left Aside .left-rail & Right Aside .right-rail -- https://cl.ly/1a3A0m2d4208 https://cl.ly/441R0x0b2I0h3

3. Elements used to wrap important, interactive elements
  - any wrapping elements of menus: https://cl.ly/0Y3w0x0g2Y2R
  - tablist for trending topics. Each tab's li, although each tab is tabbable https://cl.ly/1u3p0D2U2X0A
  - in the comment form for pictures newsfeed items, the user's avatar, a div wrapping a comment box with some styles applied to it, and wrapper div for attach a photo input element. The other action items in the same list are just links.

4. Interactive elements that aren't being used as interactive elements
  - links in the tabs list from above. They are not used as links, but are used as navigation: https://cl.ly/3q1W1b0n1H04

5. Decorative images
  - in the comment form for pictures newsfeed items, the user's avatar, a div wrapping a comment box with some styles applied to it, and wrapper div for attach a photo input element. The other action items in the same list are just links.

## What it all means

aria-hidden is for things that would be confusing, unhelpful, or completely irrelevant to users with a screenreader. This shit really doesn't have any business getting read. It's content that would really be harmful to the overall usability of your site or application for someone with a screenreader.
role="presentation" is for more benign stuff that you've got in the DOM that isn't important and will just slow someone down. This I think is why aria-hidden obscures everything it wraps. Like, this shit is harmful, cut it and everything it owns out of the fuckin picture.. role="presentation", on the other hand,
doesn't obscure it's children, because it's typically trying to get out of your way on the way to the children.

aria-hidden could change. role="presentation" does not.

Accessible websites

https://www.cdc.gov/healthyyouth/about/index.htm - AH 3 RP 4
https://twitter.com
https://www.facebook.com/ - AH 101 - RP 77
https://www.linkedin.com/feed/ - AH 69 - RP 2
https://www.google.com/ - AH 12 - RP 1
https://www.amazon.com/ - AH 136 RP 11
https://www.apple.com/ - AH 16 - RP 24

Want to look at how any given website is using these `aria-hidden="true"` and `role="presentation"` attributes? Navigate to that site, open the developer tools console, and paste this in:

```javascript
(() => {
  const usesOfAriaHidden = document.querySelectorAll('[aria-hidden="true"]');
  console.log('Uses of aria-hidden="true"', usesOfAriaHidden);

  const usesOfRolePresentation = document.querySelectorAll('[role="presentation"]');
  console.log('Uses of role="presentation"', usesOfRolePresentation);
})();
```

<div id="good-resources">
## Some good resources
</div>

