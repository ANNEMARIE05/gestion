import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainLayoutComponent } from './components/main-layout/main-layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { ProductionComponent } from './pages/production/production';
import { ProductionDetailComponent } from './pages/production/production-detail/production-detail';
import { ProductionCreateComponent } from './pages/production/production-create/production-create';
import { ProductionEditComponent } from './pages/production/production-edit/production-edit';
import { AuditComponent } from './pages/audit/audit';
import { VeilleComponent } from './pages/veille/veille';
import { ProjetsComponent } from './pages/projets/projets';
import { ProjetsCreateComponent } from './pages/projets/projets-create/projets-create';
import { ProjetsDetailComponent } from './pages/projets/projets-detail/projets-detail';
import { ProjetsEditComponent } from './pages/projets/projets-edit/projets-edit';
import { ApplicationsComponent } from './pages/applications/applications';
import { ApplicationsCreateComponent } from './pages/applications/applications-create/applications-create';
import { ApplicationsDetailComponent } from './pages/applications/applications-detail/applications-detail';
import { ApplicationsEditComponent } from './pages/applications/applications-edit/applications-edit';
import { PlanificationComponent } from './pages/planification/planification';
import { PlanificationCreateComponent } from './pages/planification/planification-create/planification-create';
import { PlanificationDetailComponent } from './pages/planification/planification-detail/planification-detail';
import { PlanificationEditComponent } from './pages/planification/planification-edit/planification-edit';
import { UsersCreateComponent } from './pages/users/users-create/users-create';
import { UsersDetailComponent } from './pages/users/users-detail/users-detail';
import { UsersEditComponent } from './pages/users/users-edit/users-edit';
import { ProfileComponent } from './pages/profile/profile';
import { ParametreComponent } from './pages/parametre/parametre';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UsersCreateComponent },
      { path: 'users/:id/edit', component: UsersEditComponent },
      { path: 'users/:id', component: UsersDetailComponent },
      { path: 'production', component: ProductionComponent },
      { path: 'production/create', component: ProductionCreateComponent },
      { path: 'production/:id', component: ProductionDetailComponent },
      { path: 'production/:id/edit', component: ProductionEditComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'veille', component: VeilleComponent },
      { path: 'projets', component: ProjetsComponent },
      { path: 'projets/create', component: ProjetsCreateComponent },
      { path: 'projets/:id', component: ProjetsDetailComponent },
      { path: 'projets/:id/edit', component: ProjetsEditComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'applications/create', component: ApplicationsCreateComponent },
      { path: 'applications/:id', component: ApplicationsDetailComponent },
      { path: 'applications/:id/edit', component: ApplicationsEditComponent },
      { path: 'planification', component: PlanificationComponent },
      { path: 'planification/create', component: PlanificationCreateComponent },
      { path: 'planification/:id', component: PlanificationDetailComponent },
      { path: 'planification/:id/edit', component: PlanificationEditComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'parametre', component: ParametreComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }
];