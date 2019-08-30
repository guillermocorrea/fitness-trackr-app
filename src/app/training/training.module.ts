import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { StoreModule } from '@ngrx/store';
import * as fromTraining from './training.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { TrainingEffects } from './training.effects';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature(
      fromTraining.trainingFeatureKey,
      fromTraining.reducer
    ),
    // EffectsModule.forFeature([TrainingEffects])
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
