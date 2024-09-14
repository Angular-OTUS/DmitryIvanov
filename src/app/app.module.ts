import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from './Shared/components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from './Shared/directives/tooltip/tooltip.directive';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from './Shared/components/toast';

@NgModule({
  declarations: [AppComponent, ToDoListComponent, ToDoListItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ButtonComponent,
    MatTooltipModule,
    TooltipDirective,
    MatIconModule,
    ToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
