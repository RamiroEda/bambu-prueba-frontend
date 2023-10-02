import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { MessagesModule } from 'primeng/messages';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AuthComponent } from './auth/auth.component';
import { PokemonComponent } from './home/pokemon/pokemon.component';
import { CadenasComponent } from './home/cadenas/cadenas.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CountNumbersPipe } from './home/cadenas/data/pipes/count-numbers.pipe';
import { ProfileComponent } from './home/profile/profile.component';
import { TimestampFormatPipe } from './home/profile/data/pipes/timestamp-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AuthComponent,
    PokemonComponent,
    CadenasComponent,
    PokemonCardComponent,
    CountNumbersPipe,
    ProfileComponent,
    TimestampFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    ToastModule,
    PaginatorModule,
    FormsModule,
    MessagesModule,
    ChipModule,
    DialogModule,
    MenubarModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    HttpClientModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    ProgressSpinnerModule,
    CardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
