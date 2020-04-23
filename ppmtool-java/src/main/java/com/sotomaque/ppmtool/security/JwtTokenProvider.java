package com.sotomaque.ppmtool.security;

import com.sotomaque.ppmtool.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import static com.sotomaque.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.sotomaque.ppmtool.security.SecurityConstants.SECRET;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// method that will generate token when we have a valid username and password

@Component
public class JwtTokenProvider {
    // generate token
    public String generateToken(Authentication authentication) {
        // get user
        User user = (User) authentication.getPrincipal();
        // get date with MS
        Date now = new Date(System.currentTimeMillis());
        // get expiration date
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);

        // get userId
        String userId = Long.toString(user.getId());

        // this is what we can return to the client
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        // return JWTsBuilder to start building JsonWebToken
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    // validate token
    // get userId from token (with CustomUserService)
}
