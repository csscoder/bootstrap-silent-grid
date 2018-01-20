# Bootstrap Silent Grid

Source file SCSS [link](https://github.com/csscoderRU/bootstrap-silent-grid/blob/master/source/scss/_bootstrap-silent-grid.scss)

## I want to be free in class naming

I like Bootstrap 4 grid on Flex, but do not like clutter up HTML. I have a visual discomfort, difficult to track steps of media queries when I use bootstrap naming in HTML. For example

    <header class="header">
        <div class="container">
            <div class="row align-items-start justify-content-star justify-content-lg-end">
                <div class="col-4 col-md-6 col-xl-8">
                    more code...


## Captain Obvious. Bootstrap Silent Grid

I like BEM, and code like this

    <header class="l-header">
        <div class="header">
            <div class="header__hero">
                more code...

When I write SCSS with **Bootstrap Silent Grid** I can write with silent class and mixin for media queries

    .l-header {
        @extend %container;
    }

    .header {
        @extend %row;
        @extend %justify-content-star;
        font-size: 10px;

        @extend %justify-content-lg-end;
        @include res(lg) {
            font-size: 20px;
        }
    }

    .header__hero {
        @extend %col-4;

        @extend %col-md-6;

        @extend %col-xl-8;
    }

## I got profit

1. Small result CSS file.
2. Intelligibility of code, ease of support code.
3. Speed up coding.

## MediaQueries mixins

In sourse file include MediaQueries mixins bit examples

    // SCSS
    .test {
        @include res-less(lg) {
            font-size: 18px;
        }
        @include res(lg) {
            font-size: 20px;
        }
    }
    // Result CSS
    @media (max-width: 991px) {
        .test {
            font-size: 18px
        }
    }
    @media (min-width: 992px) {
        .test {
            font-size: 20px
        }
    }

## Limitations

1. May be is not will be good on very big project.
2. For get smaller result CSS file you need use GLOB imports SCSS code (if you use more than 1 SCSS file).
