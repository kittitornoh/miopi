# Jr Software Engineer – Programming Assignment

This was a programming assignment given to me during the final interview process for a Junior Software Engineer position. I was given one week to complete the assignment. I used MySQL, Express, React, and Node as my stack.

## General Description

Your goal is to write a web application that allows for registered users to create posts that have a
title and body, and for everyone to be able to view those posts.

You may use any language and frameworks that are appropriate, but please do not use any fully-
coded applications. The purpose of this is for us to evaluate your programming aptitude.

## Requirements

1. On the homepage, a guest or authenticated user should be able to see a grid of posts
   made by everyone, sorted by the date they were created with the newest showing first.

   1. Display the entire post title
   2. Display the first 200 characters of the post body and add ellipses (...) if it is being
      truncated.
   3. On a desktop, the grid should be 4 posts per row.
   4. On mobile, the grid should be 1 post per row.
   5. This is the only page you need to worry about making responsive. For the others, assume
      you are on a desktop.

2. On the homepage, a guest who is not signed in should see a link to create an account or
   log in.

3. On the homepage, an authenticated user who is signed in should see a link to log out.

4. A guest or authenticated user should be able to see a page that displays the post in its
   entirety.

5. A guest should be able to register an account.

   1. First Name (required)
   2. Last Name (required)
   3. Email (required)
   4. Password (required)
   5. Provide appropriate error messaging.

6. A guest should be able to log in.

   1. Provide appropriate error messaging.

7. An authenticated user should be able to create a new post.

   1. Title (required)
   2. Body (required, plain text)
   3. Provide appropriate error messaging.

8. An authenticated user should be able to see a list of the posts they’ve made.

9. An authenticated user should be able to delete their posts (and only their posts).
