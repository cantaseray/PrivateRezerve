package org.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    private final ReservationService reservationService;

    public HelloController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/business/{id}/reservations")
    public List<Reservation> getReservationsByBusinessId(@PathVariable Long id) {
        return reservationService.getReservationsByBusinessId(id);
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
}