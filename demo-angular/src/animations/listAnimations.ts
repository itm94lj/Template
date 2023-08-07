import {trigger, animation, style, animate, stagger, query, transition, animateChild, group} from "@angular/animations";
/**
 * Created by fenggu on 2023/7/30.
 */

export const listItemStaggerIncreaseAnimation = animation([
    style({opacity: 0, transform: 'translateX({{offset}})'}),
    stagger(30, [
      animate('{{time}}', style({opacity: 1, transform: 'none'}))
    ])
]);

export const listItemStaggerDecreaseAnimation = animation([
    stagger(30, [
      animate('{{time}}', style({opacity: 0, transform: 'translateX({{offset}})'}))
    ])
]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ],
        {optional: true}),
      query(':enter', [
        style({left: '-100%'})
      ],
        {optional: true}),
      // query(':leave', animateChild(),
      //   {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ],
          {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ],
          {optional: true}),
        // query('@*', animateChild(),
        //   {optional: true})
      ]),
    ]),


  ]);
