import { createClient } from 'npm:@supabase/supabase-js@2';
import { required } from '../_shared/config.ts';

Deno.serve(async (request) => {
  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization) return Response.json({ error: 'Authentication required' }, { status: 401 });
    const supabase = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'));
    const token = authorization.replace(/^Bearer\s+/i, '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user?.email) return Response.json({ error: 'Invalid session' }, { status: 401 });
    const { data, error } = await supabase.rpc('paid_access_for_email', { requested_email: user.email }).single();
    if (error) throw error;
    return Response.json({
      hasAccess: data.has_access,
      accessType: data.access_type,
      subscriptionStatus: data.subscription_status,
      validUntil: data.valid_until
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Entitlement lookup failed' }, { status: 500 });
  }
});
