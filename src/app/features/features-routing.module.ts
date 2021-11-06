import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';

import { FeaturesComponent } from './features.component';
import { SalesDashboardModule } from './Sales/sales-dashboard/sales-dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Client/login/login.module').then((m) => m.LoginModule),
        // import('./order-report/order-report.module').then((m) => m.OrderReportModule),
        //import('./package/package.module').then((m) => m.PackageModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./Client/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./Client/register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'verify',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/verify/verify.module').then((m) => m.VerifyModule),
      },
      {
        path: 'confirmation',
       // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/confirmation/confirmation.module').then((m) => m.ConfirmationModule),
      },
      {
        path: 'services',
        canActivate: [AuthGuard],
        //data : ['Client'],
        loadChildren: () =>
          import('./Client/services/services.module').then((m) => m.ServicesModule),
      },

      {
        path: 'user-details',
      canActivate: [AuthGuard],
      //data : ['Client'],
        loadChildren: () =>
          import('./Client/consent/consent.module').then((m) => m.ConsentModule),
      },
      {
        path: 'ORDER_REPORT',
      canActivate: [AuthGuard],
     // data : ['Client'],
        loadChildren: () =>
          import('./Client/order-report/order-report.module').then((m) => m.OrderReportModule),
      },
      {
        path: 'packages',
       canActivate: [AuthGuard],
      // data : ['Client'],
        loadChildren: () =>
          import('./Client/package/package.module').then((m) => m.PackageModule),
      },
      {
        path: 'REPORT_MANAGEMENT',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Admin/report-management/report-management.module').then((m) => m.ReportManagementModule),
      },
      {
        path: 'provider',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/provider/provider.module').then((m) => m.ProviderModule),
      },
      {
        path: 'providerlist',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/providerlist/providerlist.module').then((m) => m.ProviderlistModule),
      },
      {
        path: 'servicelist',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/servicelist/servicelist.module').then((m) => m.ServicelistModule),
      },
      {
        path: 'usermanagement',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/usermanagement/usermanagement.module').then((m) => m.UsermanagementModule),
      },
      {
        path: 'adduser',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/adduser/adduser.module').then((m) => m.AdduserModule),
      },
      {
        path: 'agreement',
        canActivate: [AuthGuard],
       // data : ['Client'],
        loadChildren: () =>
          import('./Client/agreement/agreement.module').then((m) => m.AgreementModule),
      },
      {
        path: 'newleads',
        canActivate: [AuthGuard],
       // data : ['Sales'],
        loadChildren: () =>
          import('./Sales/newleads/newleads.module').then((m) => m.NewleadsModule),
      },
      {
        path: 'REPORT',
        canActivate: [AuthGuard],
       // data : ['Client'],
        loadChildren: () =>
          import('./Client/order-list/order-list.module').then((m) => m.OrderListModule),
      },
      {
        path: 'order-package',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Client/order-package/order-package.module').then((m) => m.OrderPackageModule),
      },
      {
        path: 'report-list',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Admin/report-list/report-list.module').then((m) => m.ReportListModule),
      },
      {
        path: 'thankyou',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Client/thankyou/thankyou.module').then((m) => m.ThankyouModule),
      },
      {
        path: 'HOME',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Client/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'newleaddetails',
        canActivate: [AuthGuard],
      //  data : ['Sales'],
        loadChildren: () =>
          import('./Sales/newleaddetails/newleaddetails.module').then((m) => m.NewleaddetailsModule),
      },

      {
        path: 'packagelist',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Client/packagelist/packagelist.module').then((m) => m.PackageslistModule),
      },
      {
        path: 'acceptancemsg',
        canActivate: [AuthGuard],
      //  data : ['Client'],
        loadChildren: () =>
          import('./Client/acceptancemsg/acceptancemsg.module').then((m) => m.AcceptancemsgModule),
      },
      {
        path: 'sales-dashboard',
        canActivate: [AuthGuard],
      //  data : ['Sales'],
        loadChildren: () =>
          import('./Sales/sales-dashboard/sales-dashboard.module').then((m) => m.SalesDashboardModule),
      },
      {
        path: 'NEW_CLIENTS',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Legal/legalleads/legalleads.module').then((m) => m.LegalleadsModule),
      },
      {
        path: 'ADMIN_DASHBOARD',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/admin-dashboard/admin-dashboard.module').then((m) => m.AdminDashboardModule),
      },
      {
        path: 'admin-addmenu',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/admin-addmenu/admin-addmenu.module').then((m) => m.AdminAddmenuModule),
      },
      {
        path: 'legalstatus',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Legal/legalstatus/legalstatus.module').then((m) => m.LegalstatusModule),
      },
      {
        path: 'admin-documents',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/admin-documents/admin-documents.module').then((m) => m.AdminDocumentsModule),
      },
      {
        path: 'manage-menu',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/manage-menu/manage-menu.module').then((m) => m.ManageMenuModule),
      },
      {
        path: 'usergroups',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/usergroups/usergroups.module').then((m) => m.UsergroupsModule),
      },
      {
        path: 'group-action',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/addmenugroupaction/addmenugroupaction.module').then((m) => m.AddmenugroupactionModule),
      },
      {
        path: 'client-document',
        //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/client-documents/client-documents.module').then((m) => m.ClientDocumentsModule),
      },
      {
        path: 'consent-page',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/consentform/consentform.module').then((m) => m.ConsentformModule),
      },
      {
        path: 'verified-email',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/verified-email/verified-email.module').then((m) => m.VerifiedEmailModule),
      },
      {
        path: 'application-disclosure',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/applicationdiscloure/applicationdiscloure.module').then((m) => m.ApplicationdiscloureModule),
      },
      {
        path: 'thank-submission',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/thanksubmission/thankyou.module').then((m) => m.ThankyouSubModule),
      },
      {
        path: 'reset-password',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
      },
      {
        path: 'forgetPassword',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
      },
      {
        path: 'MY_DOCUMENT',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/mydocuments/mydocuments.module').then((m) => m.MydocumentsModule),
      },
      {
        path: 'admin-menu',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/admin-menu/admin-menu.module').then((m) => m.AdminMenuModule),
      },
      {
        path: 'consentdocuments',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/consentdocs/consentdocs.module').then((m) => m.ConsentdocsModule),
      },
      {
        path: 'DOCUMENTMASTER',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Admin/documentmaster/documentmaster.module').then((m) => m.DocumentmasterModule),
      },
      {
        path: 'CHANGE_PASSWORD',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
      {
        path: 'PROFILE_DETAILS',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/profile-details/profile-details.module').then((m) => m.ProfileDetailsModule),
      },
      {
        path: 'LOGOUT',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/logout/logout.module').then((m) => m.LogoutModule),
      },
      {
        path: 'INVOICES',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Account/myinvoice/myinvoice.module').then((m) => m.MyinvoiceModule),
      },
      {
        path: 'VIEW_PACKAGES',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/viewpackages/viewpackages.module').then((m) => m.ViewPackagesModule),
      },
      {
        path: 'BULKORDERS',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/bulkorders/bulkorders.module').then((m) => m.BulkordersModule),
      },
      {
        path: 'SEARCH_REPORT',
         canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Account/searchreport/searchreport.module').then((m) => m.SearchreportModule),
      },
      {
        path: 'consent/socr',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/summaryofconsumerrights/summaryofconsumerrights.module').then((m) => m.SummaryofconsumerrightsModule),
      },
      {
        path: 'consent/adf',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/applicationdisclosureform/applicationdisclosureform.module').then((m) => m.ApplicationdisclosureformModule),
      },
      {
        path: 'consent/ssa89',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/ssa89/ssa89.module').then((m) => m.Ssa89Module),
      },
      {
        path: 'consent/drugscreen',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/drugscreening/drugscreening.module').then((m) => m.DrugscreeningModule),
      },
      {
        path: 'consent/ev',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/employementverify/employementverify.module').then((m) => m.EmployementverifyModule),
      },
      {
        path: 'consent/cori',
         //canActivate: [AuthGuard],
        loadChildren: () =>
          import('./consentdocuments/coriform/coriform.module').then((m) => m.CoriformModule),
      },
      {
        path: 'MY_TEMPLATES',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./Client/mytemplates/mytemplates.module').then((m) => m.MytemplatesModule),
      },
      {
        path: 'MY_INVOICES',
        redirectTo : 'INVOICES',
        canActivate: [AuthGuard],
      },
      {
        path: 'FAQ',
        //canActivate: [AuthGuard],
        loadChildren: () =>
          import('../components/faq/faq.module').then((m) => m.FaqModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule { }
