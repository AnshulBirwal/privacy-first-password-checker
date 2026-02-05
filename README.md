# Privacy-First Password Breach Checker

try out on: https://anshulbirwal.github.io/privacy-first-password-checker/
This is a client-side web application designed to verify whether a password has appeared in known data breaches. It performs this check using k-anonymity, ensuring that the password (and even its full cryptographic hash) never leaves the user's browser.

The application is built with React, TypeScript, and Vite, leveraging the native browser Web Crypto API for performance and security.
## Project Overview

The primary goal of this tool is to allow users to audit their password security without compromising privacy. Unlike traditional login forms, this application does not transmit the user's input to a backend server. All cryptographic operations are performed locally on the client side.

The application queries the Have I Been Pwned API using a partial hash comparison method known as k-anonymity. This ensures that the external API service cannot identify the specific password being checked.
Security Architecture
k-Anonymity

The core security feature of this application is k-anonymity. When a user checks a password, the application does not send the password or its hash to the API. Instead, it follows this protocol:

    Local Hashing: The password is hashed using the SHA-1 algorithm within the browser using the Web Crypto API.

    Prefix Extraction: The application extracts only the first 5 characters of the resulting hexadecimal hash (the "prefix").

    Blind Query: The application sends this 5-character prefix to the API.

    Data Retrieval: The API returns a list of all known breached password hashes that begin with that same 5-character prefix. This list typically contains hundreds of unrelated hashes.

    Local Comparison: The application iterates through the returned list locally in the browser to see if the remaining part of the user's hash (the "suffix") matches any entry.

### Threat Model

    Trusted Environment: The user's browser runtime and the native Web Crypto API.

    Untrusted Environment: The network and the external API provider.

    Guarantee: Because only the first 5 characters of the hash are transmitted, the server cannot derive the original password or the full hash. The mathematical search space for the remaining 35 characters is too large to reverse-engineer for a specific user.

### Data Flow

The following steps outline the lifecycle of a password check within the application:

    Input: User types a password into the input field.

    Processing:

        The application converts the string to a Uint8Array.

        The crypto.subtle.digest('SHA-1', ...) method computes the hash.

        The hash is converted to an uppercase hexadecimal string (e.g., 5BAA61E4...).

    Network Request:

        The application splits the hash into a prefix (5BAA6) and a suffix (1E4...).

        A GET request is sent to https://api.pwnedpasswords.com/range/5BAA6.

    Verification:

        The API responds with a text list of suffixes and breach counts.

        The application parses this list and searches for an exact match of the user's local suffix.

    Output:

        If a match is found, the breach count is displayed.

        If no match is found, the password is reported as not found in the database.

    Cleanup: The password variable is cleared from the React state immediately after hashing.

### Tech Stack

    Language: TypeScript

    Framework: React

    Build Tool: Vite

    Cryptography: Web Crypto API (Native browser standard)

    Deployment: GitHub Pages

## Installation and Setup

To run this project locally, ensure you have Node.js installed.

Clone the repository:

`git clone https://github.com/AnshulBirwal/privacy-first-password-checker.git`

Install dependencies:

`npm install`

Run the development server:

`npm run dev`

Build for production:

`npm run build`

This command builds the project to the dist folder and pushes it to the gh-pages branch.
## Disclaimer

This tool is provided for educational and defensive purposes only. While the architecture ensures that your password is not transmitted, no software is immune to vulnerabilities in the underlying browser or operating system.

The breach data is sourced from the Have I Been Pwned public API. Absence of a password in this database does not guarantee it has never been compromised, only that it is not present in the specific datasets aggregated by this service.

I recommend using a randomly generated password from a password manager, and making sure your master password is strong and easy for you to remember 🙂
