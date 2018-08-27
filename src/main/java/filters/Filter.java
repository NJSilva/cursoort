package filters;

import java.io.IOException;
import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import static javax.ws.rs.core.Response.Status.METHOD_NOT_ALLOWED;
import javax.ws.rs.ext.Provider;

@Provider
@Secured
@Priority(Priorities.AUTHENTICATION)
public class Filter implements ContainerRequestFilter, ContainerResponseFilter {

    private static String valido = "2018-cjpb";
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String method = requestContext.getMethod();
        String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        String[] split = token.split(" ");

        if (token.contains("Bearer") && split.length > 1 && split[1].equals(valido) ) {
            System.out.println("OK");
        }else{
            requestContext.abortWith(Response.status(METHOD_NOT_ALLOWED).build());
        }
        
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        String origin = responseContext.getHeaderString("date");
        System.out.println(origin);
    }

}
