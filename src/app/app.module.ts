import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { StoreModule } from '@ngrx/store';
import { ToDoEffects, toDoFeatureKey, toToReducer } from '@entities/to-do';
import { environment } from '@environments';
import { ToastModule } from '@features/toast';
import { AppRoutingModule } from '@pages/app-routing.module';
import { AppComponent } from './app.component';
import { AppSerializer } from './RouterStore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({ [toDoFeatureKey]: toToReducer, router: routerReducer }),
    EffectsModule.forRoot(ToDoEffects),
    StoreRouterConnectingModule.forRoot({
      serializer: AppSerializer,
    }),
    environment.imports,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
