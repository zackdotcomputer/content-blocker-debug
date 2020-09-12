[![Netlify Status](https://api.netlify.com/api/v1/badges/86f46aca-d774-4239-b9eb-0ec1e05fb231/deploy-status)](https://app.netlify.com/sites/contentblockerdebugger/deploys)

# Purpose

This is the repository that backs the [Webkit Content Blocker Debugger](https://contentblockerdebugger.netlify.app/). The goal of this site is to provide a simple way to analyze which rules in the (sometimes very large) JSON definition files that back [Apple's Webkit Content Blocker](https://developer.apple.com/documentation/safariservices/creating_a_content_blocker) system will fire for a particular load.

# Methodology

The debugger works entirely on your device, so your definition files are never uploaded over the internet to another service. The site implements the spec defined on Apple's site for the Content Blocker system. You can provided it with a call your device might make, and it will parse that call through the rules in your definitions file and return to you the end effect and a list of all rules which match the query (even if they were ignored or overpowered by another rule).

# Who

I'm [Zack Sheppard](https://zacksheppard.com). I make iOS apps. Feel free to contact me if you need an iOS app made or if you want to collaborate on something.
