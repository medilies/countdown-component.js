# countdown-component

## Importing

This utility relies on `momentjs` library so you must include its CDN before calling the `countdown-component` code.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
    integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="/countdown.js"></script>
```

## Usage

1. Write a `div` or many with the attribute `CountDown`.
2. Give the attribute `data-countdown-duration` an integer value of the amount of seconds to count through.
3. Give the attribute `data-countdown-format` the time time format (check `momentjs`).
4. Give the attribute `data-countdown-step` an integer value of the amount of second to define the countdown intervals and the amount of seconds to substract on each interval.

### Example

```html
<div CountDown data-countdown-duration="60" data-countdown-format="mm:ss" data-countdown-step="1s"></div>
<div CountDown data-countdown-duration="3660" data-countdown-format="HH:mm:ss" data-countdown-step="5s"></div>
```
