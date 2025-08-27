package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    // Yeni müsait saat ekle
    @PostMapping("/add")
    public Availability addAvailability(@RequestBody Availability availability) {
        return availabilityService.addAvailability(availability);
    }

    // Belirli bir günün müsait saatlerini al
    @GetMapping("/day/{dayOfWeek}")
    public List<Availability> getAvailabilityByDay(@PathVariable String dayOfWeek) {
        return availabilityService.getAvailabilityByDay(dayOfWeek);
    }

    // Tüm müsait saatleri al
    @GetMapping("/all")
    public List<Availability> getAllAvailability() {
        return availabilityService.getAllAvailability();
    }

    // Müsaitlik güncelle
    @PutMapping("/{id}")
    public Availability updateAvailability(@PathVariable Long id, @RequestBody Availability updatedAvailability) {
        return availabilityService.updateAvailability(id, updatedAvailability);
    }

    // Müsaitlik sil
    @DeleteMapping("/{id}")
    public void deleteAvailability(@PathVariable Long id) {
        availabilityService.deleteAvailability(id);
    }
}
