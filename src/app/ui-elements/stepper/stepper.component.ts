import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { StepperOverviewComponent } from './stepper-overview/stepper-overview.component';
import { StepperAnimationsComponent } from './stepper-animations/stepper-animations.component';
import { StDisplaysErrorsItStepsComponent } from './st-displays-errors-it-steps/st-displays-errors-it-steps.component';
import { StepperHeaderPositionComponent } from './stepper-header-position/stepper-header-position.component';
import { StepperLabelBottomPositionComponent } from './stepper-label-bottom-position/stepper-label-bottom-position.component';
import { SwRequiredStepsComponent } from './sw-required-steps/sw-required-steps.component';
import { StepperResponsiveComponent } from './stepper-responsive/stepper-responsive.component';
import { StepperVerticalComponent } from './stepper-vertical/stepper-vertical.component';

@Component({
    selector: 'app-stepper',
    standalone: true,
    imports: [RouterLink, MatCardModule, StepperOverviewComponent, StepperAnimationsComponent, StDisplaysErrorsItStepsComponent, StepperHeaderPositionComponent, StepperLabelBottomPositionComponent, StepperResponsiveComponent, StepperVerticalComponent, SwRequiredStepsComponent],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss'
})
export class StepperComponent {}