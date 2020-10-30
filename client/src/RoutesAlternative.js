import React, {
  lazy,
  Suspense
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthRoute from 'src/components/AuthRoute';
import GuestRoute from 'src/components/GuestRoute';

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/home"
        />
        <Route
          exact
          path="/404"
          component={lazy(() => import('src/views/pages/Error404View'))}
        />
        <GuestRoute
          exact
          path="/login"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <AuthRoute
          path="/app"
          render={(props) => (
            <DashboardLayout {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect
                    exact
                    from="/app"
                    to="/app/reports/dashboard"
                  />
                  <Route
                    exact
                    path="/app/account"
                    component={lazy(() => import('src/views/pages/AccountView'))}
                  />
                  <Route
                    exact
                    path="/app/reports/dashboard"
                    component={lazy(() => import('src/views/reports/DashboardView'))}
                  />
                  <Route
                    exact
                    path="/app/reports/dashboard-alternative"
                    component={lazy(() => import('src/views/reports/DashboardAlternativeView'))}
                  />
                  <Redirect
                    exact
                    from="app/reports"
                    to="/app/reports/dashboard"
                  />
                  <Route
                    exact
                    path="/app/calendar"
                    component={lazy(() => import('src/views/calendar/CalendarView'))}
                  />
                  <Route
                    path={[
                      '/app/chat/new',
                      '/app/chat/:threadKey'
                    ]}
                    component={lazy(() => import('src/views/chat/ChatView'))}
                  />
                  <Route
                    path={[
                      '/app/mail/label/:customLabel/:mailId?',
                      '/app/mail/:systemLabel/:mailId?'
                    ]}
                    component={lazy(() => import('src/views/mail/MailView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/charts/apex"
                    component={lazy(() => import('src/views/extra/charts/ApexChartsView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/forms/formik"
                    component={lazy(() => import('src/views/extra/forms/FormikView'))}
                  />
                  <Redirect to="/404" />
                </Switch>
              </Suspense>
            </DashboardLayout>
          )}
        />
        <Route
          path="/docs"
          render={(props) => (
            <DocsLayout {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect
                    exact
                    from="/docs"
                    to="/docs/welcome"
                  />
                  <Route
                    exact
                    path="/docs/welcome"
                    component={lazy(() => import('src/views/docs/WelcomeView'))}
                  />
                  <Route
                    exact
                    path="/docs/getting-started"
                    component={lazy(() => import('src/views/docs/GettingStartedView'))}
                  />
                  <Route
                    exact
                    path="/docs/environment-variables"
                    component={lazy(() => import('src/views/docs/EnvironmentVariablesView'))}
                  />
                  <Route
                    exact
                    path="/docs/deployment"
                    component={lazy(() => import('src/views/docs/DeploymentView'))}
                  />
                  <Route
                    exact
                    path="/docs/api-calls"
                    component={lazy(() => import('src/views/docs/ApiCallsView'))}
                  />
                  <Route
                    exact
                    path="/docs/analytics"
                    component={lazy(() => import('src/views/docs/AnalyticsView'))}
                  />
                  <Route
                    exact
                    path="/docs/authentication"
                    component={lazy(() => import('src/views/docs/AuthenticationView'))}
                  />
                  <Route
                    exact
                    path="/docs/routing"
                    component={lazy(() => import('src/views/docs/RoutingView'))}
                  />
                  <Route
                    exact
                    path="/docs/settings"
                    component={lazy(() => import('src/views/docs/SettingsView'))}
                  />
                  <Route
                    exact
                    path="/docs/state-management"
                    component={lazy(() => import('src/views/docs/StateManagementView'))}
                  />
                  <Route
                    exact
                    path="/docs/theming"
                    component={lazy(() => import('src/views/docs/ThemingView'))}
                  />
                  <Route
                    exact
                    path="/docs/support"
                    component={lazy(() => import('src/views/docs/SupportView'))}
                  />
                  <Route
                    exact
                    path="/docs/changelog"
                    component={lazy(() => import('src/views/docs/ChangelogView'))}
                  />
                  <Redirect to="/404" />
                </Switch>
              </Suspense>
            </DocsLayout>
          )}
        />
        <Route
          path="*"
          render={(props) => (
            <MainLayout {...props}>
              <Switch>
                <Route
                  exact
                  path="/home"
                  component={HomeView}
                />
                <Route
                  exact
                  path="/pricing"
                  component={lazy(() => import('src/views/pages/PricingView'))}
                />
                <Redirect to="/404" />
              </Switch>
            </MainLayout>
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
